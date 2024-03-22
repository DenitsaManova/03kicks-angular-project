import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

import { PostInterface } from 'src/app/core/interfaces/Post';
import { PostsService } from 'src/app/core/services/posts.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit, OnDestroy {
  sneaker!: PostInterface;
  subscribe!: Subscription;
  errorMessage!: string;

  constructor(
    private PostsService: PostsService,
    private router: Router,
    private route: ActivatedRoute,) { }

  ngOnInit(): void {
    const sneakerId: string = this.route.snapshot.params['sneakerId'];
    console.log(sneakerId);
    
    this.subscribe = this.PostsService.getPostById(sneakerId).subscribe({
      next: (sneakerInfo) => {
        this.sneaker = sneakerInfo;
        //this.isOwner = episodeInfo._ownerId == this.userId;
      },
      error: (error) => this.errorMessage = error.error.message
    });
  }

  ngOnDestroy(): void {
    if (this.subscribe != undefined) {
      this.subscribe.unsubscribe();
    }
  }
}


