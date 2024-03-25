import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CatalogComponent } from './catalog/catalog.component';
import { CreateComponent } from './create/create.component';
import { EditComponent } from './edit/edit.component';
import { DetailsComponent } from './details/details.component';
import { NotFoundComponent } from './not-found/not-found.component';

import { hasUserGuard } from 'src/app/core/guards/has-user.guard';


const routes: Routes = [
    {
        path: "sneakers",
        component: CatalogComponent
    },
    {
        path: "create",
        canActivate: [hasUserGuard],
        component: CreateComponent
    },
    {
        path: "sneakers/edit/:sneakerId",
        canActivate: [hasUserGuard],
        component: EditComponent
    },
    {
        path: "sneakers/details/:sneakerId",
        component: DetailsComponent
    }, 
    {
        path: '**', 
        component: NotFoundComponent
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PostsRoutingModule { }