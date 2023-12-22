import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { API_URL } from '../../constants';
import { catchError, throwError } from 'rxjs';
import { IComment, ICommentPost, IPost, IPostList } from './interfaces';

@Injectable({ providedIn: 'root' })
export class PostService {
  posts = signal<IPostList>({ posts: [] });
  postInfo = signal<IPost | null>(null);
  comments = signal<IComment[]>([]);

  constructor(
    private readonly http: HttpClient,
    private readonly router: Router
  ) {}

  postComment(id: number, data: ICommentPost) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http
      .post(`${API_URL}/comments/${id}/`, data, {
        headers,
        withCredentials: true,
      })
      .pipe()
      .subscribe((data: any) => {
        this.getComments(id);
      });
  }

  getComments(id: number) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http
      .get<IComment[]>(`${API_URL}/comments/${id}/`)
      .pipe()
      .subscribe((data: IComment[]) => {
        this.comments.set(data);
      });
  }

  getAllPosts() {
    return this.http
      .get<IPostList>(`${API_URL}/posts/`, {})
      .pipe()
      .subscribe((data: IPostList) => {
        this.posts.set(data);
      });
  }

  getPostById(id: number) {
    return this.http
      .get<IPost>(`${API_URL}/post/${id}/ `, {})
      .pipe()
      .subscribe((data: IPost) => {
        this.postInfo.set(data);
      });
  }
}
