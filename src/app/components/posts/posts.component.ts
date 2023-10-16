import { Post } from 'src/utils/interfaces';
import { PostsService } from '../../services/posts-service.service';
import { Component, OnInit, OnChanges } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
})
export class PostsComponent implements OnInit, OnChanges {
  title: string = 'baerBlog';
  searchValue: string = '';

  posts: Post[] = [];

  constructor(private postsService: PostsService, private router: Router) {}

  ngOnInit(): void {
    this.loadAllPosts();
  }

  ngOnChanges(): void {
    console.log(this.searchValue);
  }

  navigateToPost(id: number): void {
    this.router.navigate(['posts', id]);
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

  getDate(stringDate: string): string {
    return new Date(stringDate).toLocaleDateString('en-US');
  }
}
