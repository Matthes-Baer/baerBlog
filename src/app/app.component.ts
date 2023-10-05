import { Component, OnInit } from '@angular/core';
import { PostsService } from './services/posts-service.service';
import type { Post } from 'src/utils/interfaces';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'baerBlog';

  posts: Post[] = [];

  constructor(private postsService: PostsService) {}

  ngOnInit(): void {
    this.loadAllPosts();
  }

  loadAllPosts(): void {
    this.postsService.getAllPosts().subscribe((data) => {
      this.posts = data;
    });
  }

  loadPostsByTag(tag: string): void {
    this.postsService.getPostsByTag(tag).subscribe((data) => {
      this.posts = data;
    });
  }
}
