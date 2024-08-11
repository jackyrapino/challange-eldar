import { Component, OnInit } from '@angular/core';
import { ApiManagerService } from '../../services/api-manager/api-manager.service';
import { Post } from '../../interfaces/post';
import { CardPostComponent } from "../card-post/card-post.component";
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PaginatorModule } from 'primeng/paginator';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CardPostComponent, IconFieldModule, InputIconModule, InputTextModule, FormsModule, CommonModule,PaginatorModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit{
  posts:Post[] = [];
  searchText: string = '';
  first: number = 1;
  rows: number = 10;
  constructor(private apiManagerService:ApiManagerService) { }

  ngOnInit(): void {
   this.getPosts();
  }
  onPageChange(event:any){
    this.first = event.first;
    this.rows = event.rows;
    console.log(event);
  }
  get paginatedPosts() {
    return this.posts.slice(this.first, this.first + this.rows);
  }

  getPosts(){
    this.apiManagerService.getPosts().subscribe(
      (data) => {
        this.posts = data
        console.log(data);
      }
    )
  }

  search(event:Event){
    console.log((this.searchText));
  }

}
