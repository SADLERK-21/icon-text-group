import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { IconInputType } from 'src/app/custom-tegs/icon-input/icon-input.component';
import { ProfileValidationEvent, ProfileService, ProfileFields } from '../profile-page/profile.service';
import { LoginRegisterUserService } from 'src/app/core-services/login-register-user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
  public emailType = IconInputType.Email;
  public passwordType = IconInputType.Password;
  public textType = IconInputType.Text;
  public numberType = IconInputType.Number;

  public emailText: string;
  public firstNameText: string;
  public lastNameText: string;
  public phoneNumber: string;
  public webSiteText: string;
  public passwordText: string

  public isRegisterProfileMode: boolean = false;

  private profileValidationEvent: ProfileValidationEvent;

  constructor(
    private profileService: ProfileService,
    private loginService: LoginRegisterUserService,
    private changeDetectorRef: ChangeDetectorRef,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.profileService.profileValidationSubscription.subscribe(event => {
      this.profileValidationEvent = event;
      if (event.isPassed) {
        this.loginService.setUser(
          this.emailText,
          this.firstNameText,
          this.lastNameText,
          this.phoneNumber,
          this.webSiteText,
          this.passwordText
        );
      }
      this.changeDetectorRef.markForCheck();
    });

    this.loginService.userloginResponse.subscribe(response => {
      if (response) {
        this.router.navigate(['/home']);
      }
    });

    this.loginService.userChangeResponse.subscribe(response => {
      if (response) {
        this.router.navigate(['/home']);
      }
    })
  }

  public isValid(inputType: ProfileFields): boolean {
    if (this.profileValidationEvent?.invalidfields?.some(field => field === inputType)) {
      return false;
    }
    return true
  }

  public registerClick() {
    this.isRegisterProfileMode = !this.isRegisterProfileMode;
  }

  public isLoginButtonDisabled(): boolean {
    return this.emailText == null || this.emailText.length == 0 || this.passwordText == null || this.passwordText.length == 0;
  }

  public registerNewUser() {
    this.profileService.validProfileAfterAddOrChange(
      this.emailText,
      this.firstNameText,
      this.lastNameText,
      this.phoneNumber,
      this.webSiteText,
      this.passwordText
    )
  }

  public loginUser() {
    this.loginService.loginUser(this.emailText, this.passwordText);
  }

  public discardLogin() {
    this.emailText = ''
    this.passwordText = ''

    this.router.navigate(['/home']);
  }

  public discardRegister() {
    this.emailText = ''
    this.firstNameText = ''
    this.lastNameText = ''
    this.phoneNumber = ''
    this.webSiteText = ''
    this.passwordText = ''

    this.isRegisterProfileMode = false;
    this.changeDetectorRef.markForCheck();
  }
}
