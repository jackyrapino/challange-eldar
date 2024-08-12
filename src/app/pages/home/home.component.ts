import { Component, OnInit } from '@angular/core';
import { ApiManagerService } from '../../services/api-manager/api-manager.service';
import { Post } from '../../interfaces/post';
import { CardPostComponent } from '../../components/card-post/card-post.component';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PaginatorModule } from 'primeng/paginator';
import { ButtonModule } from 'primeng/button';
import { MenubarModule } from 'primeng/menubar';
import { UserManagerService } from '../../services/user-manager/user-manager.service';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';
import { CardModule } from 'primeng/card';
import { ToolbarComponent } from "../../components/toolbar/toolbar.component";
import { PostService } from '../../services/post/post.service';
import { concatMap, forkJoin, tap } from 'rxjs';
import { SkeletonModule } from 'primeng/skeleton';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CardPostComponent,
    IconFieldModule,
    InputIconModule,
    InputTextModule,
    FormsModule,
    CommonModule,
    PaginatorModule,
    ButtonModule,
    MenubarModule,
    CardModule,
    ToolbarComponent,
    SkeletonModule
],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  posts: Post[] = [];
  searchText: string = '';
  first: number = 0;
  rows: number = 10;
  postFiltered: Post[] = [];
  localPosts: Post[] = [];
  userLogged: any = {};
  isLoading: boolean = true;

  constructor(
    private apiManagerService: ApiManagerService,
    private userManager: UserManagerService,
    private authService: AuthService,
    private router: Router,
    private postService: PostService
  ) {}

  ngOnInit(): void {
    this.getPostsAndLocalPosts();
    this.getLoggedUser();
  }
  onPageChange(event: any) {
    this.first = event.first;
    this.rows = event.rows;
   
  }
  get paginatedPosts() {
    return this.postFiltered.slice(this.first, this.first + this.rows);
  }

  getPostsAndLocalPosts() {
    this.apiManagerService.getPosts().pipe(
      tap(apiPosts => {
        this.posts = apiPosts;
      }),
      concatMap(() => this.postService.getPosts()),
      tap(localPosts => {
        this.localPosts = localPosts;
        this.posts = this.replacePosts(this.localPosts, this.posts);
        this.sortPostsByIdDesc();
        this.postService.setIncrementalIdPosts(this.posts[0]);
        this.postFiltered = [...this.posts];
      

        this.isLoading = false;
      })
    ).subscribe({
      error: (err) => {
        console.error('Error fetching posts:', err);
        this.isLoading = false;
      }
    });
  }
  
  replacePosts(localPosts: Post[], apiPosts: Post[]): Post[] {
    const postMap = new Map<number, Post>();
  
    // Primero, añadir todos los apiPosts al mapa
    apiPosts.forEach(apiPost => {
      if(apiPost.id) postMap.set(apiPost.id, apiPost);
    });
  
    // Luego, reemplazar o añadir con los localPosts
    localPosts.forEach(localPost => {
    if(localPost.id) postMap.set(localPost.id, localPost);
    });
  
    // Convertir el mapa de vuelta a un array de posts
    return Array.from(postMap.values());
  }

  sortPostsByIdDesc() {
    this.posts.sort((a: any, b: any) => b.id - a.id);
  }

  search(event: Event) {
    if (!this.searchText) {
      this.postFiltered = this.posts;
      return;
    }
  
    let searchText = this.searchText.toLowerCase();
    this.postFiltered = this.posts.filter(
      (post) =>
        post.title.toLowerCase().includes(searchText) ||
        post.body.toLowerCase().includes(searchText)
    );
  
  }

  goToNewPost() {
    this.router.navigate(['/new-post']);
  }

  getLoggedUser() {
   this.userLogged = this.userManager.getUser()

  }


}
