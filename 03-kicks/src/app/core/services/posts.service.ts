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

  deletePostById(postId: string): Observable<unknown> {
    const url = `http://localhost:3030/data/sneakers/${postId}`;
    return this.http.delete<unknown>(url);
  }


  likePostById(postId: string): Observable<unknown> {
    const url = 'http://localhost:3030/data/likes';
    return this.http.post<unknown>(url, {postId});
  }

  canLike(postId: string, userId: string): Observable<number> {
    const url = `http://localhost:3030/data/likes?where=postId%3D%22${postId}%22%20and%20_ownerId%3D%22${userId}%22&count`;
    return this.http.get<number>(url);
  }

  postTotalLikes(postId: string): Observable<number> {
    const url = `http://localhost:3030/data/likes?where=postId%3D%22${postId}%22&distinct=_ownerId&count`;
    return this.http.get<number>(url);
  }
  
}
