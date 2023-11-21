import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { HttpClientModule } from '@angular/common/http'
import { ProfilePageComponent } from "./profile-page.component";
import { ProfileService } from "./profile.service";
import { IconInputComponent } from "src/app/custom-tegs/icon-input/icon-input.component";
import { FormsModule } from "@angular/forms";
import { Routes, RouterModule } from "@angular/router";

const routes: Routes = [
    { path: '', component: ProfilePageComponent },
    { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
    imports: [
        HttpClientModule,
        RouterModule.forChild(routes),
        CommonModule,
        FormsModule
    ],
    declarations: [
        ProfilePageComponent,
        IconInputComponent
    ],
    providers: [
        ProfileService
    ]
})
export class ProfilePageModule { }