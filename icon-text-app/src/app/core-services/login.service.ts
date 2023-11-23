import { Inject, Injectable } from "@angular/core";
import { ApiSimulator } from "./api-simulator";
import { Subject } from "rxjs";

@Injectable()
export class LoginService {
    public loginedUserId: number | undefined;
    public loginResponse = new Subject<boolean>();

    constructor(
        @Inject(ApiSimulator) private api: ApiSimulator
    ) { }

    public loginUser(email: string, password: string) {
        if (this.api.isUserlogined(email, password)) {
            this.loginedUserId = this.api.getProfileId(email, password);
            //this.isLogined = true;
            if (this.loginedUserId) {
                localStorage.setItem(this.loginedUserId?.toString(), this.loginedUserId?.toString());
            }

            this.loginResponse.next(true);
        }
    }

    public isLogined(): boolean {
        let result = false

        if (!this.loginedUserId) {
            this.api.savedProfiles.forEach(profile => {
                console.log(localStorage);
                if (localStorage.getItem(profile.id.toString()) != null) {
                    this.loginedUserId = profile.id;
                    result = true;
                }
            })
        } else {
            result = true;
        }


        return result;
    }

    public setUser(
        api: ApiSimulator,
        email: string,
        firstName: string,
        lastName: string,
        phoneNumber: string,
        webSite: string,
        password: string,
        profileId?: number,
    ) {
        if (profileId) {
            api.changeProfile(
                email, firstName, lastName, phoneNumber, webSite, profileId
            )
        } else {
            api.setNewProfile(
                email, firstName, lastName, phoneNumber, webSite, password
            );

            this.loginedUserId = api.getProfileId(email, password);
            this.loginResponse.next(true);
        }
    }

    public logOut() {
        this.loginedUserId = 0;
        //this.isLogined = false;
        localStorage.clear();
        this.loginResponse.next(false);
    }

    public getProfile(api: ApiSimulator) {
        return api.getProfile(this.loginedUserId);
    }
}