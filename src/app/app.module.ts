import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'
import { FormsModule } from '@angular/forms';
import { Routes } from '@angular/router';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { SignupComponent } from './auth/signup/signup.component';
import { SigninComponent } from './auth/signin/signin.component';
import { BookListComponent } from './book-list/book-list.component';
import { SingleBookComponent } from './book-list/single-book/single-book.component';
import { HeaderComponent } from './header/header.component';

import { AuthGuardService } from './services/auth-guard.service';
import { AuthService } from './services/auth.service';
import { BooksService } from './services/books.service';
import { BookFormComponent } from './book-list/book-form/book-form.component';

const appRoutes: Routes = [
  { path : 'auth/signin', component : SigninComponent },
  { path : 'auth/signup', component : SignupComponent },
  { path : 'books', component : BookListComponent },
  { path : 'books/new', canActivate: [AuthGuardService], component : BookFormComponent },
  { path : 'books/view/:id', component : SingleBookComponent },
  { path: '', redirectTo: 'books', pathMatch: 'full' },
  { path: '**', redirectTo: 'books' }
];

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    SigninComponent,
    BookListComponent,
    SingleBookComponent,
    HeaderComponent,
    BookFormComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [ AuthGuardService, AuthService, BooksService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
