import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { PostInterface } from '../interfaces/Post';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor(private http: HttpClient) { }

  getAllPosts(): Observable<PostInterface[]> {
    const url = 'http://localhost:3030/data/sneakers';
    return this.http.get<PostInterface[]>(url);
  }

  getPostById(postId: string): Observable<PostInterface> {
    const url = `http://localhost:3030/data/sneakers/${postId}`;
    return this.http.get<PostInterface>(url);
  }

  addPost(postData: PostInterface): Observable<PostInterface> {
    const url = 'http://localhost:3030/data/sneakers';
    return this.http.post<PostInterface>(url, postData);
  }

  editPost(postId: string, postData: PostInterface): Observable<PostInterface> {
    const url = `http://localhost:3030/data/sneakers/${postId}`;
    return this.http.put<PostInterface>(url, postData);
  }
  
}
