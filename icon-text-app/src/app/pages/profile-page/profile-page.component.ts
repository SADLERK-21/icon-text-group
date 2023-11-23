import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { IconInputType } from 'src/app/custom-tegs/icon-input/icon-input.component';
import { ProfileValidationEvent, ProfileFields, ProfileService } from './profile.service';
import { LoginRegisterUserService } from 'src/app/core-services/login-register-user.service';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent implements OnInit {
  public isEditable: boolean = false;

  public emailType = IconInputType.Email
  public textType = IconInputType.Text
  public numberType = IconInputType.Number

  public emailText: string;
  public firstNameText: string;
  public lastNameText: string;
  public phoneNumber: string;
  public webSiteText: string;

  private profileValidationEvent: ProfileValidationEvent;

  constructor(
    private profileService: ProfileService,
    private changeDetectorRef: ChangeDetectorRef,
    private loginSevice: LoginRegisterUserService
  ) { }

  ngOnInit(): void {
    const profile = this.loginSevice.profile;

    this.profileService.profileValidationSubscription.subscribe(event => {
      this.profileValidationEvent = event;
      if (event.isPassed && profile) {
        console.log(this.firstNameText);
        this.loginSevice.setUser(
          this.emailText,
          this.firstNameText,
          this.lastNameText,
          this.phoneNumber,
          this.webSiteText,
          profile.password,
          profile?.id
        )
        this.isEditable = false;
      }
      this.changeDetectorRef.markForCheck();
    });

    if (profile) {
      this.emailText = profile.email;
      this.firstNameText = profile.firstName;
      this.lastNameText = profile.lastName;
      this.phoneNumber = profile.phoneNumber;
      this.webSiteText = profile.websiteUrl;

      this.changeDetectorRef.markForCheck();
    }
  }

  public setEditable() {
    this.isEditable = !this.isEditable;
  }

  public isValid(inputType: ProfileFields): boolean {
    if (this.profileValidationEvent?.invalidfields?.some(field => field === inputType)) {
      return false;
    }
    return true
  }

  public saveChanges() {
    this.profileService.validProfileAfterAddOrChange(
      this.emailText,
      this.firstNameText,
      this.lastNameText,
      this.phoneNumber,
      this.webSiteText
    )
  }

  public isSubmitButtonDisabled(): boolean {
    return this.emailText == null ||
      this.firstNameText == null ||
      this.lastNameText == null ||
      this.phoneNumber == null ||
      this.webSiteText == null
  }

  public discardChanges() {
    const profile = this.loginSevice.profile;
    if (profile) {
      this.emailText = profile.email;
      this.firstNameText = profile.firstName;
      this.lastNameText = profile.lastName;
      this.phoneNumber = profile.phoneNumber;
      this.webSiteText = profile.websiteUrl;
    }
    this.setEditable()
    this.changeDetectorRef.markForCheck();
  }
}
