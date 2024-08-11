import { Component, Input } from '@angular/core';
import { CardModule } from 'primeng/card';
import { Post } from '../../interfaces/post';
import { TitleCasePipe, UpperCasePipe } from '@angular/common';

@Component({
  selector: 'app-card-post',
  standalone: true,
  imports: [CardModule, UpperCasePipe],
  templateUrl: './card-post.component.html',
  styleUrl: './card-post.component.scss'
})
export class CardPostComponent {
  @Input() post!: Post;
  constructor() { } 


}
