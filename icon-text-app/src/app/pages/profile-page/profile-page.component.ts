import { AfterViewInit, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Observable, Observer, Subject, Subscriber, of } from 'rxjs';
import { IconInputType } from 'src/app/custom-tegs/icon-input/icon-input.component';
import { ProfileValidationEvent, ProfileFields, ProfileService } from './profile.service';
import { LoginService } from 'src/app/core-services/login.service';
import { ApiSimulator } from 'src/app/core-services/api-simulator';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent implements OnInit, AfterViewInit {

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
    private apiSim: ApiSimulator,
    private loginSevice: LoginService
  ) { }

  ngOnInit(): void {
    this.profileService.profileValidationSubscription.subscribe(event => {
      this.profileValidationEvent = event;
      console.log(event, '1-1');
      this.changeDetectorRef.markForCheck();
    });
    // this.loginSevice.loginedUserId.subscribe(id => {
    //   console.log('id:', id);

    // })



    const profile = this.loginSevice.getProfile(this.apiSim);
    console.log('√', this.apiSim.date);
    console.log('profile: ', profile, '\n', 'id: ', this.apiSim.getLoginedProfileId());
    if (profile) {
      this.emailText = profile.email;
      this.firstNameText = profile.firstName;
      this.lastNameText = profile.lastName;
      this.phoneNumber = profile.phoneNumber;
      this.webSiteText = profile.websiteUrl;

      this.changeDetectorRef.markForCheck();
    }
  }

  ngAfterViewInit(): void {
    //const profile = this.apiSim.getProfileById(this.apiSim.getLoginedProfileId());
    //console.log('profile: ', profile, '\n', 'id: ', this.apiSim.getLoginedProfileId());
    // if (profile) {
    //   this.emailText = profile.email;
    //   this.firstNameText = profile.firstName;
    //   this.lastNameText = profile.lastName;
    //   this.phoneNumber = profile.phoneNumber;
    //   this.webSiteText = profile.websiteUrl;

    //   this.changeDetectorRef.markForCheck();
    // }
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

}
