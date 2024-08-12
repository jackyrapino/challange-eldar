import { Injectable } from '@angular/core';
import { Post } from '../../interfaces/post';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  posts: BehaviorSubject<Post[]> = new BehaviorSubject<Post[]>([]);

  constructor() { }

  getPosts() {
    return this.posts as Observable<Post[]>;
  }

  addPost(post: Post) {
    this.posts.next([...this.posts.value, post]);
    console.log(this.posts);
  } 
}
