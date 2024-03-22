import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ProfileRoutingModule } from './profile-routing.module';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [LoginComponent, RegisterComponent],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    FormsModule
  ]
})
export class ProfileModule { }
