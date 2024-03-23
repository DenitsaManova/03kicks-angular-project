import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';

import { PostInterface } from 'src/app/core/interfaces/Post';
import { PostsService } from 'src/app/core/services/posts.service';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit, OnDestroy {
  sneaker!: PostInterface;
  subscribe$!: Subscription;
  errorMessage!: string;
  isOwner!: boolean;
  isLogged!: boolean;
  userId!: string;
  canLike$!: Observable<number>;
  likes$!: Observable<number>;

  constructor(
    private PostsService: PostsService,
    private authService: AuthService,
    private router: Router,
    private titleService: Title,
    private route: ActivatedRoute,) { }

  ngOnInit(): void {
    this.titleService.setTitle('Details');
    this.isLogged = this.authService.isLogged;
    const sneakerId: string = this.route.snapshot.params['sneakerId'];
    this.userId = this.authService.getUserData()?._id as string;
    this.likes$ = this.PostsService.postTotalLikes(sneakerId);
    this.canLike$ = this.PostsService.canLike(sneakerId, this.userId);
    
    
    this.subscribe$ = this.PostsService.getPostById(sneakerId).subscribe({
      next: (sneakerInfo) => {
        this.sneaker = sneakerInfo;
        this.titleService.setTitle(this.sneaker.model);
        this.isOwner = sneakerInfo._ownerId == this.userId;
      },
      error: (error) => this.errorMessage = error.error.message
    });
  }

  removePost(sneakerId: string) {
 
    const isConfirmed = window.confirm('Are you sure you want to delete this post?');
 
    if (isConfirmed) {
      this.subscribe$ = this.PostsService.deletePostById(sneakerId).subscribe({
        error: (error) => this.errorMessage = error.error.message,
        complete: () => this.router.navigate(['sneakers'])
      });
    }

  }

  postLike(postId: string) {
    this.subscribe$ = this.PostsService.likePostById(postId).subscribe({
      error: (error) => {
        if (error.message.includes('Unknown Error')) {
          this.errorMessage = 'Server not connected!'
        } else {
          this.errorMessage = error.error.message;
        }
      },
      complete: () => {
        this.canLike$ = this.PostsService.canLike(postId, this.userId);
        this.likes$ = this.PostsService.postTotalLikes(postId);
        this.router.navigate(['/sneakers', 'details', postId]);
      },
    });
    
  }

  ngOnDestroy(): void {
    if (this.subscribe$ != undefined) {
      this.subscribe$.unsubscribe();
    }
  }
}


