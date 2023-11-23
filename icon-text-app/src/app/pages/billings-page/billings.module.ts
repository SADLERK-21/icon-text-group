import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { BillingsPageComponent } from "./billings-page.component";

const routes: Routes = [
    { path: '', component: BillingsPageComponent },
    { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
    imports: [
        HttpClientModule,
        RouterModule.forChild(routes),
        CommonModule
    ],
    declarations: [
        BillingsPageComponent
    ]
})
export class BillingsModule { }