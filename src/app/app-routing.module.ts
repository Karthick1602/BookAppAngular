import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { authGuard } from './guards/auth.guard';
import { BookComponent } from './components/book/book.component';
import { ReviewComponent } from './components/review/review.component';
import { BookDetailsComponent } from './components/book/book-details/book-details.component';

const routes: Routes = [

  {
    path: '', redirectTo: 'home', pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'book',
    component: BookComponent
  },
  {
    path: 'review',
    component: ReviewComponent
  },
  { path: 'book-details/:id', 
    component: BookDetailsComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
