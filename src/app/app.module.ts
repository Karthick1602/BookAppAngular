import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { DropdownModule } from 'primeng/dropdown';
import { MenuModule } from 'primeng/menu';
import { MenubarModule } from 'primeng/menubar';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { HttpClientModule } from '@angular/common/http';
import { ToastModule } from 'primeng/toast';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MessageService } from 'primeng/api';
import { BookComponent } from './components/book/book.component';
import { ReviewComponent } from './components/review/review.component';
import { MenuBarComponent } from './components/menu-bar/menu-bar.component';
import { BookDetailsComponent } from './components/book/book-details/book-details.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ReviewModalComponent } from './components/book/review-modal/review-modal.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';




@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    BookComponent,
    ReviewComponent,
    MenuBarComponent,
    BookDetailsComponent,
    ReviewModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CardModule,
    InputTextModule,
    ReactiveFormsModule,
    ButtonModule,
    HttpClientModule,
    ToastModule,
    BrowserAnimationsModule,
    DropdownModule,
    MenuModule,
    MenubarModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
    FormsModule,
    MatIconModule,
  ],
  providers: [MessageService,LoginComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
