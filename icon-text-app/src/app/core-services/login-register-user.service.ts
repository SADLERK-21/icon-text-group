import { Inject, Injectable } from "@angular/core";
import { ApiSimulator } from "./api-simulator";
import { Subject } from "rxjs";
import { Profile } from "../pages/profile-page/profile";

@Injectable()
export class LoginRegisterUserService {
    public loginedProfileId: number = 0;
    public loginedProfile: Profile | undefined;

    public userloginResponse = new Subject<boolean>();
    public userChangeResponse = new Subject<boolean>();

    constructor(
        @Inject(ApiSimulator) private api: ApiSimulator
    ) {
        if (this.loginedProfileId == 0) {
            this.api.savedProfiles.forEach(profile => {
                if (localStorage.getItem(profile.id.toString()) == profile.id.toString()) {
                    console.log(profile.id)
                    this.loginedProfileId = profile.id;
                    this.loginedProfile = this.api.getProfileById(profile.id);
                    this.userloginResponse.next(true);
                }
            })
        }
    }

    public loginUser(email: string, password: string) {
        if (this.api.isUserlogined(email, password)) {
            this.loginedProfile = this.api.getProfileByLogInData(email, password);
            if (this.loginedProfile) {
                this.loginedProfileId = this.loginedProfile.id;
                localStorage.setItem(this.loginedProfileId?.toString(), this.loginedProfileId?.toString());
            }
            this.userloginResponse.next(true);
        }
    }

    public isLogined(): boolean {
        return this.loginedProfileId != 0 ? true : false;
    }

    public setUser(
        email: string,
        firstName: string,
        lastName: string,
        phoneNumber: string,
        webSite: string,
        password: string,
        profileId?: number,
    ) {
        if (profileId) {
            this.api.changeProfile(
                email, firstName, lastName, phoneNumber, webSite, profileId
            )

            this.loginedProfile = this.api.getProfileById(this.loginedProfileId);
            this.userChangeResponse.next(true);
        } else {
            this.api.setNewProfile(
                email, firstName, lastName, phoneNumber, webSite, password
            );

            this.loginedProfileId = this.api.getProfileByLogInData(email, password)?.id ?? 0;
            this.loginedProfile = this.api.getProfileById(this.loginedProfileId);
            this.userloginResponse.next(true);
        }
    }

    public logOut() {
        this.loginedProfileId = 0;
        this.loginedProfile = undefined;
        localStorage.clear();
        this.userloginResponse.next(false);
    }

    public get profile() {
        return this.loginedProfile;
    }
}