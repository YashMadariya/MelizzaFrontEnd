import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { routes } from './app.routes';
import { CommonModule } from '@angular/common';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
  declarations: [],
  imports: [
    CommonModule, RouterModule.forRoot(routes),
    FormsModule, ReactiveFormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    NgxIntlTelInputModule
  ],
  exports: [RouterModule, FormsModule]
})
export class AppModule { }
