import { Injectable } from "@angular/core";
import { Profile } from "./profile";
import { Observable, Subject, Subscription } from "rxjs";

Injectable()
export class ProfileService {
    public profileChangeSubscription = new Subject<ProfileChangeEvent>();

    private profiles: Profile[] = [];

    public addNewProfile() {
    }

    public changeProfile(
        email: string,
        firstName: string,
        lastName: string,
        phoneNumber: string,
        webSite: string
    ) {
        const invalidfields: ProfileFields[] = [];
        const emailRe = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        const urlRe = /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;

        if (email?.match(emailRe) == null) {
            invalidfields.push(ProfileFields.email);
        }
        if (firstName?.length <= 3) {
            invalidfields.push(ProfileFields.firstName);
        }
        if (lastName?.length <= 3) {
            invalidfields.push(ProfileFields.lastName);
        }
        if (phoneNumber?.length < 10) {
            invalidfields.push(ProfileFields.phoneNumber);
        }
        if (!urlRe.test(webSite)) {
            invalidfields.push(ProfileFields.webSite);
        }
        if (invalidfields.length > 0) {
            this.profileChangeSubscription.next({
                isChanged: false,
                invalidfields: invalidfields
            })
        } else {
            this.profileChangeSubscription.next({
                isChanged: true
            })
        }

    }

    public deletProfile() {

    }

    public checkProfileDate() {

    }
}

export interface ProfileChangeEvent {
    isChanged: boolean;
    invalidfields?: ProfileFields[];
}

export enum ProfileFields {
    email,
    firstName,
    lastName,
    phoneNumber,
    webSite
}