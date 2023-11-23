import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeModule } from './pages/home-page/home-page.module';
import { ApiSimulator } from './core-services/api-simulator';
import { ProfileService } from './pages/profile-page/profile.service';
import { AuthGuard } from './core-services/auth-guard';
import { LoginRegisterUserService } from './core-services/login-register-user.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HomeModule
  ],
  providers: [LoginRegisterUserService, ApiSimulator, AuthGuard, ],
  bootstrap: [AppComponent],
})
export class AppModule { }
