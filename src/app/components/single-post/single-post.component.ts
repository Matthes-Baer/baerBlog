import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { PostsService } from 'src/app/services/posts-service.service';
import { Post } from 'src/utils/interfaces';

@Component({
  selector: 'app-single-post',
  templateUrl: './single-post.component.html',
  styleUrls: ['./single-post.component.scss'],
})
export class SinglePostComponent implements OnInit, OnDestroy {
  currentPost: Post = {} as Post;
  allPostsWithCurrentTag: Post[] = [];
  nextPost: Post = {} as Post;
  subscriptions: Subscription = new Subscription();

  constructor(
    private activeRoute: ActivatedRoute,
    private postService: PostsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.subscriptions.add(
      // If the URL parameter changes, the subscribe logic will run again (fetches currentPost and nextPost)
      this.activeRoute.paramMap.subscribe((param) => {
        const id: string = param.get('id') || '';
        const idNumber: number = parseInt(id);

        if (Number.isNaN(idNumber) || idNumber < 1) {
          this.router.navigate(['404']);
          return;
        }

        // Reset data before loading new content
        this.currentPost = {} as Post;
        this.allPostsWithCurrentTag = [];
        this.nextPost = {} as Post;

        this.loadSinglePost(id);
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  loadSinglePost(id: string): void {
    this.postService.getSinglePostById(id).subscribe(
      (post: Post) => {
        this.currentPost = post;

        this.postService
          .getPostsByTag(this.currentPost.tag)
          .subscribe((data: Post[]) => {
            this.allPostsWithCurrentTag = data;

            this.getNextPost();
          });
      },

      (error) => {
        this.router.navigate(['404']);
      }
    );
  }

  getDate(stringDate: string): string {
    return new Date(stringDate).toLocaleDateString('en-US');
  }

  getNextPost(): void {
    const n = this.allPostsWithCurrentTag.length - 1;
    const randomNumber = Math.floor(Math.random() * n);
    const arrayCopy = [...this.allPostsWithCurrentTag];
    const findCurrentPostIdx = arrayCopy.findIndex(
      (post: Post) => post.id === this.currentPost.id
    );

    arrayCopy.splice(findCurrentPostIdx, 1);
    this.nextPost = arrayCopy[randomNumber];
  }
}
