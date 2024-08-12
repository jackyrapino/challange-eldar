import { Component, OnInit } from '@angular/core';
import { ToolbarComponent } from '../../components/toolbar/toolbar.component';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router } from '@angular/router';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ButtonModule } from 'primeng/button';
import { FloatLabelModule } from 'primeng/floatlabel';
import { ApiManagerService } from '../../services/api-manager/api-manager.service';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { PostService } from '../../services/post/post.service';
import { Post } from '../../interfaces/post';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-new-post',
  standalone: true,
  imports: [
    ToolbarComponent,
    ReactiveFormsModule,
    InputTextModule,
    InputTextareaModule,
    ButtonModule,
    FloatLabelModule,
    ToastModule,
    FormsModule,
    CommonModule,
  ],
  templateUrl: './new-post.component.html',
  styleUrl: './new-post.component.scss',
})
export class NewPostComponent implements OnInit {
  newPostForm: FormGroup = new FormGroup({});
  postEdit: Post | null = null;
  idNewPost: number = 0;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private apiservice: ApiManagerService,
    private messageService: MessageService,
    private postservice: PostService
  ) {
    this.getpostToEdit();
  }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.newPostForm = this.fb.group({
      title: [''],
      body: [''],
    });

    if (this.postEdit) {
      this.setValuesEdit();
    }
  }

  setValuesEdit() {
    this.newPostForm.get('title')?.setValue(this.postEdit?.title);
    this.newPostForm.get('body')?.setValue(this.postEdit?.body);
  }

  createPost() {
    if (this.postEdit) {
      this.updatePost();
      return;
    }
    let post = {
      title: this.newPostForm.get('title')?.value,
      body: this.newPostForm.get('body')?.value,
      userId: 1,
    };

    this.apiservice.createPost(post).subscribe((res) => {
      console.log(res);
      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: 'Post created successfully',
      });
     
        this.postservice.addPost({
          title: res.title,
          body: res.body,
          userId: res.userId,
          id: this.postservice.getIncrementalIdPosts(),
        });
        this.router.navigate(['/home']);
     
    });
  }

  getpostToEdit() {
    this.postservice.getEditPost().subscribe((post) => {
      this.postEdit = post;
      console.log(this.postEdit);
    });
  }

  updatePost() {

    

    let post: Post = {
      title: this.newPostForm.get('title')?.value,
      body: this.newPostForm.get('body')?.value,
      userId: this.postEdit?.userId,
      id: this.postEdit?.id,
    };

    this.apiservice.updatePost(post).subscribe({
      next: (res) => {  this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: 'Post updated successfully',
      });
      this.postservice.addPost(res);
      this.router.navigate(['/home']);
      },
      error: (err) => {
        if (err.status === 500) {
          this.postservice.updateExistingPost(post);
          this.router.navigate(['/home']);
        }
      },
    } );
  }
}
