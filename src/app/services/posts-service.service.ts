import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import type { Post } from 'src/utils/interfaces';

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
      .pipe(map((posts) => posts.filter((post) => post.tags.includes(tag))));
  }
}
