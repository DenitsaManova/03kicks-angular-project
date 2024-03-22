import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostsRoutingModule } from './posts-routing.module';
import { CatalogComponent } from './catalog/catalog.component';
import { CreateComponent } from './create/create.component';
import { DetailsComponent } from './details/details.component';
import { EditComponent } from './edit/edit.component';
import { FormsModule } from '@angular/forms'; 




@NgModule({
  declarations: [CatalogComponent, CreateComponent, DetailsComponent, EditComponent],
  imports: [
    CommonModule,
    PostsRoutingModule,
    FormsModule
  ]
})
export class PostsModule { }
