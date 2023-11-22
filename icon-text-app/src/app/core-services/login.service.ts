import { Injectable } from "@angular/core";
import { ApiSimulator } from "./api-simulator";
import { Subject } from "rxjs";

Injectable()
export class LoginService {
    private loginedUserId: number | undefined;

    public loginResponse = new Subject<boolean>();
    //public loginedUserId = new Subject<number>();

    public isUserLogined(id: number, api: ApiSimulator): boolean {
        return api.getLoginedProfileId() === id;
    }

    public loginUser(email: string, password: string, api: ApiSimulator) {
        if (api.isUserlogined(email, password)) {
            this.loginResponse.next(true);
            this.loginedUserId = api.getProfileId(email, password)
            //this.loginedUserId.next(1);

        }
    }
    
    public getProfile(api: ApiSimulator) {
        return api.getProfile(this.loginedUserId);
    }
}