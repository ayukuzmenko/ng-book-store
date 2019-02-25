import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AboutComponent } from "./components/about/about.component";
import { AddBookComponent } from "./components/add-book/add-book.component";
import { EditBookComponent } from "./components/edit-book/edit-book.component";
import { NotFoundComponent } from "./components/not-found/not-found.component";
import { PanelComponent } from "./components/panel/panel.component";

const routes: Routes = [
  { path: ``, redirectTo: `panel`, pathMatch: `full`}, 
  { path: `panel`, component: PanelComponent},  
  { path: `about`, component: AboutComponent},
  { path: `addbok`, component: AddBookComponent},
  { path: `books/:id`, component: EditBookComponent},
  { path: `**`, component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
