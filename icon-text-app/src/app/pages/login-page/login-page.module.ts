import { CommonModule } from "@angular/common";
import { LoginPageComponent } from "./login-page.component";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { IconInputModule } from "src/app/custom-tegs/icon-input/icon-input.model";
import { IconInputComponent } from "src/app/custom-tegs/icon-input/icon-input.component";
import { ProfileService } from "../profile-page/profile.service";
import { LoginService } from "src/app/core-services/login.service";
import { ApiSimulator } from "src/app/core-services/api-simulator";

const routes: Routes = [
    { path: '', component: LoginPageComponent },
    { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
    imports: [
        HttpClientModule,
        RouterModule.forChild(routes),
        CommonModule,
        IconInputModule
    ],
    declarations: [
        LoginPageComponent
    ],
    providers: [
        ProfileService,
        LoginService,
        ApiSimulator
    ]
})
export class LoginPageModule { }