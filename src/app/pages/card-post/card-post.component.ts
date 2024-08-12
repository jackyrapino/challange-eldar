import { Component, Input, OnInit } from '@angular/core';
import { CardModule } from 'primeng/card';
import { Post } from '../../interfaces/post';
import { TitleCasePipe, UpperCasePipe } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-card-post',
  standalone: true,
  imports: [CardModule, UpperCasePipe],
  templateUrl: './card-post.component.html',
  styleUrl: './card-post.component.scss'
})
export class CardPostComponent implements OnInit {
  @Input() post!: Post;
  constructor(private route:Router) { } 


  ngOnInit(): void {  


  }

  goToEditPost(){
    this.route.navigate(['/edit-post', this.post.id])
  }


}
