import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Title } from '@angular/platform-browser';

import { PostInterface } from 'src/app/core/interfaces/Post';
import { PostsService } from 'src/app/core/services/posts.service';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css']
})
export class CatalogComponent implements OnInit, OnDestroy{
  postsList: PostInterface[] = [];
  subscribe!: Subscription;
  errorMessage!: string;

  constructor(private PostsService: PostsService,  private titleService: Title) {}
  
  ngOnInit(): void {
    this.titleService.setTitle('03Kicks');
    this.subscribe = this.PostsService.getAllPosts().subscribe({
      next: (posts) => {
        this.postsList = posts;
        
      },
      error: (error) => {
        if (error.message.includes('Unknown Error')) {
          this.errorMessage = 'Server not connected'
        } else {
          this.errorMessage = error.error.message;
        }
      }
    });

  }

  ngOnDestroy(): void {
    if (this.subscribe != undefined) {
      this.subscribe.unsubscribe();
    }
  }
}

