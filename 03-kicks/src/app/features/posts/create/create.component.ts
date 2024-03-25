import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { PostInterface } from 'src/app/core/interfaces/Post';
import { AuthService } from 'src/app/core/services/auth.service';
import { PostsService } from 'src/app/core/services/posts.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit, OnDestroy {
  subscribe!: Subscription;
  errorMessage!: string;

  constructor(private PostsService: PostsService, private titleService: Title, private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
    this.titleService.setTitle('Create');
  }

  createMethod(formData: NgForm) {
    const userId = this.authService.getUserData()?._id;
    const userInput = formData.value;
    userInput._ownerId = userId;

    this.PostsService.getAllPosts().subscribe({
      next: (posts: PostInterface[]) => {

        const postExists = posts.some(post => post.model === userInput.model);
        if (postExists) {
          this.errorMessage = 'Sneakers with this name already exists.';
        } else {
          this.subscribe = this.PostsService.addPost(userInput).subscribe({
            next: () => this.router.navigate(['/sneakers']),
           
          })

        }
      },
      error: (error) => {
           if (error.message.includes('Unknown Error')) {
             this.errorMessage = 'Server not connected!'
           } else {
             this.errorMessage = error.error.message;
           }
         }
      })
    
  }
  ngOnDestroy(): void {
    if (this.subscribe != undefined) {
      this.subscribe.unsubscribe();
    }
  }
}
