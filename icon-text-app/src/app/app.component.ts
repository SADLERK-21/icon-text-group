import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { LoginRegisterUserService } from './core-services/login-register-user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {
  title = 'icon-text-app';

  public firstNameText: string;
  public viewMessage: boolean;

  constructor(
    private readonly loginService: LoginRegisterUserService,
    private changeDetectorRef: ChangeDetectorRef,
    private readonly router: Router
  ) {

  }

  ngOnInit(): void {
    this.loginService.userloginResponse.subscribe(() => {
      this.changeDetectorRef.markForCheck();
    });

    this.loginService.userChangeResponse.subscribe(() => {
      this.viewMessage = true;
      setTimeout(() => {
        this.viewMessage = false;
        this.changeDetectorRef.markForCheck();
      }, 15000);
      this.changeDetectorRef.markForCheck();
    });
  }

  public get isLogined(): boolean {
    return this.loginService.isLogined();
  }

  public get profileName(): string | undefined {
    return this.loginService.profile?.firstName;
  }

  public logOut() {
    this.loginService.logOut();
    this.router.navigate(['/home']);
  }

  public click() {
    this.changeDetectorRef.markForCheck();
  }

  public onMessageClick() {
    this.viewMessage = false;
  }
}
