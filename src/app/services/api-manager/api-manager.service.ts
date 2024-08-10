import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Post } from '../../interfaces/post';

@Injectable({
  providedIn: 'root'
})
export class ApiManagerService {
  private apiUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getPosts(): Observable<Post[]> {
    return this.http.get(`${this.apiUrl}/posts`) as Observable<Post[]>
  }

  getPostById(id: number): Observable<Post> {
    return this.http.get(`${this.apiUrl}/posts/${id}`) as Observable<Post>
  }

  createPost(post: Post): Observable<Post> {
    return this.http.post(`${this.apiUrl}/posts`, post) as Observable<Post>
  }

  updatePost(post: Post): Observable<Post> {
    return this.http.put(`${this.apiUrl}/posts/${post.id}`, post) as Observable<Post>
  }
}
