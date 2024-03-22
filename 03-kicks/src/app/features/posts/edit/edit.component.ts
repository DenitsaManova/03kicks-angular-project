import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { PostInterface } from 'src/app/core/interfaces/Post';
import { PostsService } from 'src/app/core/services/posts.service';



@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
})
export class EditComponent implements OnInit, OnDestroy {
  post!: PostInterface;
  subscribe$!: Subscription;
  errorMessage!: string;

  constructor(
    private PostsService: PostsService,
    private titleService: Title,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.titleService.setTitle('Edit Page');
    const postId = this.route.snapshot.params['sneakerId'];
    console.log(postId);
    
    this.subscribe$ = this.PostsService.getPostById(postId).subscribe({
      next: (postInfo) => this.post = postInfo,
      error: (error) => this.errorMessage = error.error.message
    });
  }

  editHandler(formData: NgForm) {
    const postId = this.route.snapshot.params['sneakerId'];

    this.subscribe$ = this.PostsService.editPost(postId, formData.value).subscribe({
      error: (error) => {
        if (error.message.includes('Unknown Error')) {
          this.errorMessage = 'Server not connected!'
        } else {
          this.errorMessage = error.error.message;
        }
      },
      complete: () => this.router.navigate([ '/sneakers', 'details', `${postId}`])
    });
  }

  ngOnDestroy(): void {
    if (this.subscribe$ != undefined) {
      this.subscribe$.unsubscribe();
    }
  }
}
