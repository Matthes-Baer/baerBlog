import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import type { Post } from 'src/utils/interfaces';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  private readonly postsUrl = 'assets/postsData.json';

  constructor(private http: HttpClient) {}

  getAllPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(this.postsUrl);
  }

  getPostsByTag(tag: string): Observable<Post[]> {
    return this.http
      .get<Post[]>(this.postsUrl)
      .pipe(
        map((posts: Post[]) => posts.filter((post: Post) => post.tag === tag))
      );
  }

  getPostsByTitle(title: string): Observable<Post[]> {
    return this.http
      .get<Post[]>(this.postsUrl)
      .pipe(
        map((posts: Post[]) =>
          posts.filter((post: Post) => post.title.includes(title))
        )
      );
  }

  getSinglePostById(id: string): Observable<Post> {
    return this.http.get<Post[]>(this.postsUrl).pipe(
      map((posts: Post[]) => {
        const post = posts.find((post: Post) => post.id === parseInt(id));
        if (!post) {
          throw new Error('Post not found');
        }
        return post;
      }),
      catchError((err) => throwError(() => new Error(err)))
    );
  }
}
