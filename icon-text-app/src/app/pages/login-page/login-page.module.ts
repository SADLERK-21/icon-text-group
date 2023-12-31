import { CommonModule } from "@angular/common";
import { LoginPageComponent } from "./login-page.component";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { IconInputModule } from "src/app/custom-tegs/icon-input/icon-input.model";
import { ProfileService } from "../profile-page/profile.service";

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
        ProfileService
    ]
})
export class LoginPageModule { }