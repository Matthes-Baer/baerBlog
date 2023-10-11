import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostsService } from 'src/app/services/posts-service.service';
import { Post } from 'src/utils/interfaces';

@Component({
  selector: 'app-single-post',
  templateUrl: './single-post.component.html',
  styleUrls: ['./single-post.component.scss'],
})
export class SinglePostComponent implements OnInit {
  currentPost: Post = {} as Post;

  constructor(
    private activeRoute: ActivatedRoute,
    private postService: PostsService
  ) {}

  ngOnInit(): void {
    this.activeRoute.paramMap.subscribe((param) => {
      const id: string = param.get('id') || '';
      this.loadSinglePost(id);
    });
  }

  loadSinglePost(id: string): void {
    this.postService.getSinglePostById(id).subscribe((posts: Post) => {
      this.currentPost = posts;
    });
  }
}
