import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CatalogComponent } from './catalog/catalog.component';
import { CreateComponent } from './create/create.component';
import { EditComponent } from './edit/edit.component';
import { DetailsComponent } from './details/details.component';


const routes: Routes = [
    {
        path: "sneakers",
        component: CatalogComponent
    },
    {
        path: "create",
        component: CreateComponent
    },
    {
        path: "sneakers/edit/:sneakerId",
        component: EditComponent
    },
    {
        path: "sneakers/details/:sneakerId",
        component: DetailsComponent
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PostsRoutingModule { }