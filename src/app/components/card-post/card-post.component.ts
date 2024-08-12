import { Component, Input, OnInit } from '@angular/core';
import { CardModule } from 'primeng/card';
import { Post } from '../../interfaces/post';
import { TitleCasePipe, UpperCasePipe } from '@angular/common';
import { Router } from '@angular/router';
import { PostService } from '../../services/post/post.service';

@Component({
  selector: 'app-card-post',
  standalone: true,
  imports: [CardModule, UpperCasePipe],
  templateUrl: './card-post.component.html',
  styleUrl: './card-post.component.scss'
})
export class CardPostComponent implements OnInit {
  @Input() post!: Post;
  @Input() userLogged: any;
  constructor(private route:Router, private postService: PostService) { } 


  ngOnInit(): void { 

  }

  goToEditPost(post: Post) {
    this.route.navigate(['/edit-post', this.post.id]).then(() => {
      this.postService.setEditPost(post);
    })

  }


}
