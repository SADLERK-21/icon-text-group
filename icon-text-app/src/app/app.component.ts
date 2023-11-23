import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { LoginService } from './core-services/login.service';
import { ApiSimulator } from './core-services/api-simulator';
import { ProfileService } from './pages/profile-page/profile.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {
  title = 'icon-text-app';
  //public isLogined: boolean = false;
  public firstNameText: string;

  constructor(
    private readonly loginService: LoginService,
    private readonly profileService: ProfileService,
    private readonly apiSim: ApiSimulator,
    private changeDetectorRef: ChangeDetectorRef,
    private readonly router: Router
  ) {

  }

  ngOnInit(): void {
    this.loginService.loginResponse.subscribe(event => {
      this.changeDetectorRef.markForCheck();
    });

    this.profileService.profileValidationSubscription.subscribe(event => {
      this.changeDetectorRef.markForCheck();
    });
  }

  public get isLogined(): boolean {
    return this.loginService.isLogined();
  }

  public get profileName(): string | undefined {
    return this.loginService.getProfile(this.apiSim)?.firstName;
  }

  public logOut() {
    this.loginService.logOut();
    this.router.navigate(['/home']);
  }

  public click() {
    this.changeDetectorRef.markForCheck();
  }
}
