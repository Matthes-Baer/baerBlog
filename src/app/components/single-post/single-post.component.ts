import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
    private postService: PostsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.activeRoute.paramMap.subscribe((param) => {
      const id: string = param.get('id') || '';
      const idNumber: number = parseInt(id);

      if (Number.isNaN(idNumber) || idNumber < 1) {
        this.router.navigate(['404']);
        return;
      }

      this.loadSinglePost(id);
    });
  }

  loadSinglePost(id: string): void {
    this.postService.getSinglePostById(id).subscribe(
      (post: Post) => {
        this.currentPost = post;
      },
      (error) => {
        this.router.navigate(['404']);
      }
    );
  }

  getDate(stringDate: string): string {
    return new Date(stringDate).toLocaleDateString('en-US');
  }
}
