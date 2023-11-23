import { Profile } from "../pages/profile-page/profile";
import { Injectable } from "@angular/core";

@Injectable()
export class ApiSimulator {
    private profileIdForGeneration = 1;

    public savedProfiles: Profile[] = [
        {
            id: 1,
            email: 'Admin@gmail.com',
            firstName: 'Admin',
            lastName: 'Admin',
            phoneNumber: '7777777777',
            websiteUrl: 'https://vk.com/sadlerk',
            password: '111'
        }
    ];

    public getProfileByLogInData(email: string, password: string) {
        return this.savedProfiles.find(profile => profile.email === email && profile.password === password);
    };

    public getProfileById(id: number | undefined) {
        return this.savedProfiles.find(profile => profile.id === id);
    };

    public isUserlogined(email: string, password: string): boolean {
        const loginedProfile = this.savedProfiles.find(profile => profile.email === email && profile.password === password);
        if (loginedProfile) {
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
        password: string) {
        this.savedProfiles.unshift(
            {
                id: this.generateProfileId(),
                email: email,
                firstName: firstName,
                lastName: lastName,
                phoneNumber: phoneNumber,
                websiteUrl: webSite,
                password: password
            }
        );
    }

    public changeProfile(
        email: string,
        firstName: string,
        lastName: string,
        phoneNumber: string,
        webSite: string,
        profileId: number) {

        const oldProfile = this.savedProfiles.find(profile => profile.id === profileId)

        if (oldProfile) {
            this.savedProfiles.filter(profile => profile.id === profileId);
            this.savedProfiles.unshift({
                id: oldProfile.id,
                email: email,
                firstName: firstName,
                lastName: lastName,
                phoneNumber: phoneNumber,
                websiteUrl: webSite,
                password: oldProfile.password
            }
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