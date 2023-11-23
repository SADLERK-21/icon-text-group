import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ReportsPageComponent } from "./reports-page.component";

const routes: Routes = [
    { path: '', component: ReportsPageComponent },
    { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
    imports: [
        HttpClientModule,
        RouterModule.forChild(routes),
        CommonModule
    ],
    declarations: [
        ReportsPageComponent
    ]
})
export class ReportsPageModule { }