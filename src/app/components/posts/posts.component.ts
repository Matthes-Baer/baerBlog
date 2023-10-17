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
  allTags: string[] = ['All', 'Angular', 'Godot', 'Codingproblem'];
  selectedTag: string = 'All';
  selectedDateSort: string = 'Decreasing';

  constructor(private postsService: PostsService, private router: Router) {}

  ngOnInit(): void {
    this.loadAllPosts();
  }

  ngOnChanges(): void {}

  selectTag(tag: string): void {
    this.selectedTag = tag;
  }

  resetOptions(): void {
    this.loadAllPosts();
    this.selectedTag = 'All';
    this.selectedDateSort = 'Decreasing';
  }

  navigateToPost(id: number): void {
    this.router.navigate(['posts', id]);
  }

  searchForValue(): void {
    if (!this.searchValue) {
      this.loadAllPosts();
    } else {
      this.loadPostsByTitle(this.searchValue);
    }
  }

  loadAllPosts(): void {
    this.postsService.getAllPosts().subscribe((data: Post[]) => {
      this.posts = data;
    });
  }

  loadPostsByTag(tag: string): void {
    if (tag === 'All') {
      this.loadAllPosts();
    } else {
      this.postsService.getPostsByTag(tag).subscribe((data: Post[]) => {
        this.posts = data;
      });
    }
  }

  loadPostsByTitle(title: string): void {
    this.postsService.getPostsByTitle(title).subscribe((data: Post[]) => {
      this.posts = data;
    });
  }

  sortByDate(sortBy: string): void {
    this.posts.sort((postA: Post, postB: Post) => {
      if (sortBy === 'Increasing') {
        return new Date(postA.date).getTime() - new Date(postB.date).getTime();
      } else {
        return new Date(postB.date).getTime() - new Date(postA.date).getTime();
      }
    });
  }

  getDate(stringDate: string): string {
    return new Date(stringDate).toLocaleDateString('en-US');
  }
}
