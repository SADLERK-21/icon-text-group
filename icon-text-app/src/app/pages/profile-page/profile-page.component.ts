import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Observable, Observer, Subject, Subscriber, of } from 'rxjs';
import { IconInputType } from 'src/app/custom-tegs/icon-input/icon-input.component';
import { ProfileChangeEvent, ProfileFields, ProfileService } from './profile.service';

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

  private profileChangeEvent: ProfileChangeEvent;

  constructor(
    private profileService: ProfileService,
    private changeDetectorRef: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.profileService.profileChangeSubscription.subscribe(event => {
      this.profileChangeEvent = event;
      console.log(event);
      this.changeDetectorRef.markForCheck();
    });
  }

  public set email(value: string) {
    this.emailText = value;
  }

  public get email(): string {
    return this.emailText;
  }

  public setEditable() {
    this.isEditable = !this.isEditable;
  }

  public isValid(inputType: ProfileFields): boolean {
    if (this.profileChangeEvent?.invalidfields?.some(field => field === inputType)) {
      return false;
    }
    return true
  }

  public saveChanges() {
    this.profileService.changeProfile(
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
