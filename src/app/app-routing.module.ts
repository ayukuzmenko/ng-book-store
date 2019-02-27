import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AboutComponent } from "./components/about/about.component";
import { AddBookComponent } from "./components/add-book/add-book.component";
import { EditBookComponent } from "./components/edit-book/edit-book.component";
import { NotFoundComponent } from "./components/not-found/not-found.component";
import { PanelComponent } from "./components/panel/panel.component";
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './guard/auth.guard';
import { RegisterComponent } from './components/register/register.component';
import { ClientHomeComponent } from './components/client-home/client-home.component';

const routes: Routes = [
  { path: ``, component: ClientHomeComponent, canActivate: [AuthGuard]}, 
  { path: `login`, component: LoginComponent},
  { path: `register`, component: RegisterComponent},
  { path: `panel`, component: PanelComponent, canActivate: [AuthGuard]},
  { path: `about`, component: AboutComponent, canActivate: [AuthGuard]},
  { path: `addbook`, component: AddBookComponent, canActivate: [AuthGuard]},
  { path: `books/:id`, component: EditBookComponent, canActivate: [AuthGuard]},
  { path: `**`, component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})

export class AppRoutingModule { }
