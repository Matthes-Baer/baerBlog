import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { PostsService } from './services/posts-service.service';
import type { Post } from 'src/utils/interfaces';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title: string = 'baerBlog';
  searchValue: string = '';

  posts: Post[] = [];

  constructor(private postsService: PostsService) {}

  ngOnInit(): void {
    this.loadAllPosts();
  }

  ngOnChanges(): void {
    console.log(this.searchValue);
  }

  searchForValue(): void {
    if (!this.searchValue) {
      this.loadAllPosts();
    } else {
      this.posts = this.posts.filter((entry: Post) =>
        entry.title.includes(this.searchValue)
      );
    }
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
