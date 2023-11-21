import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeModule } from './pages/home-page/home-page.module';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';
import { IconInputComponent } from './custom-tegs/icon-input/icon-input.component';
import { FormsModule } from '@angular/forms';
import { ProfilePageModule } from './pages/profile-page/profile-page.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HomeModule,
    ProfilePageModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
