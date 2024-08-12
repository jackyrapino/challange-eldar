import { Component, OnInit } from '@angular/core';
import { ToolbarComponent } from '../../components/toolbar/toolbar.component';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ButtonModule } from 'primeng/button';
import { FloatLabelModule } from 'primeng/floatlabel';
import { ApiManagerService } from '../../services/api-manager/api-manager.service';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { PostService } from '../../services/post/post.service';

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
    ToastModule
  ],
  templateUrl: './new-post.component.html',
  styleUrl: './new-post.component.scss',
})
export class NewPostComponent implements OnInit {
  newPostForm: FormGroup = new FormGroup({});

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private apiservice: ApiManagerService,
    private messageService: MessageService,
    private postservice: PostService
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.newPostForm = this.fb.group({
      title: [''],
      body: [''],
    });
  }

  createPost() {
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
      })
      this.postservice.addPost(res);
      this.router.navigate(['/home']);
    });
  }
}
