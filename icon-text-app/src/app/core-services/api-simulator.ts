import { Subject } from "rxjs";
import { Profile } from "../pages/profile-page/profile";
import { Injectable } from "@angular/core";

Injectable()
export class ApiSimulator {
    private profileIdForGeneration = 1;
    private loginedProfileId: number;

    private savedProfiles: Profile[] = [
        {
            id: 1,
            email: '89370703848@mail.ru',
            firstName: 'Valeriy',
            lastName: 'Manshin',
            phoneNumber: '9370703848',
            websiteUrl: 'https://vk.com/sadlerk',
            password: '123'
        }
    ];

    public get date() {
        return this.loginedProfileId;
    }

    public getLoginedProfileId(): number {
        return this.loginedProfileId;
    }

    public getProfileId(email: string, password: string) {
        return this.savedProfiles.find(profile => profile.email === email && profile.password === password)?.id;
    };

    public getProfile(id: number | undefined) {
        return this.savedProfiles.find(profile => profile.id === id);
    };

    public isUserlogined(email: string, password: string): boolean {
        const loginedProfile = this.savedProfiles.find(profile => profile.email === email && profile.password === password);
        if (loginedProfile) {
            console.log('logined', loginedProfile.id);
            this.loginedProfileId = loginedProfile.id;
            return true;
        }

        return false
    }

    public setNewProfile(
        email: string,
        firstName: string,
        lastName: string,
        phoneNumber: string,
        webSite: string,
        password: string,
        profileId?: number) {
        this.savedProfiles.unshift(
            {
                id: profileId ?? this.generateProfileId(),
                email: email,
                firstName: firstName,
                lastName: lastName,
                phoneNumber: phoneNumber,
                websiteUrl: webSite,
                password: password
            }
        )

        //localStorage.setItem()
    }

    public changeProfile(
        profileId: number,
        email: string,
        firstName: string,
        lastName: string,
        phoneNumber: string,
        webSite: string) {

        const oldProfile = this.savedProfiles.find(profile => profile.id === profileId)

        if (oldProfile) {
            this.savedProfiles.filter(profile => profile.id === profileId);
            this.setNewProfile(
                email,
                firstName,
                lastName,
                phoneNumber,
                webSite,
                oldProfile.password,
                oldProfile.id
            );
        }

    }

    private generateProfileId(): number {
        if (this.savedProfiles.some(profile => profile.id === this.profileIdForGeneration)) {
            this.profileIdForGeneration++
            return this.generateProfileId()
        } else {
            let result = this.profileIdForGeneration;
            this.profileIdForGeneration = 1;
            return result;
        }

    }
}