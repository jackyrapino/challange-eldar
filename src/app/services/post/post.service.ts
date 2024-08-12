import { Injectable } from '@angular/core';
import { Post } from '../../interfaces/post';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  posts: BehaviorSubject<Post[]> = new BehaviorSubject<Post[]>([]);
  postEditNavigated: Subject<Post> = new Subject<Post>();
  lastPostId: number = 0;
  constructor() { }

  getPosts() {
    return this.posts as Observable<Post[]>;
  }

  addPost(post: Post) {
    this.posts.next([...this.posts.value, post]);
    console.log(this.posts);
  } 

  updateExistingPost(post: Post) {
    const index = this.posts.value.findIndex((p) => p.id === post.id);
    if (index !== -1) {
      this.posts.value[index] = post;
      this.posts.next([...this.posts.value]);
    }
  }

  getEditPost() {
    return this.postEditNavigated as Observable<Post>;
  }

  setEditPost(post: Post) {
    this.postEditNavigated.next(post);
  }


  setIncrementalIdPosts(post: Post) {
    if (post.id) {
      this.lastPostId = post.id;
      this.lastPostId++;
    }
  }

  getIncrementalIdPosts(): number {
    return this.lastPostId;
  }
}