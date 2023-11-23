import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { InventoryPageComponent } from "./inventory-page.component";

const routes: Routes = [
    { path: '', component: InventoryPageComponent },
    { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
    imports: [
        HttpClientModule,
        RouterModule.forChild(routes),
        CommonModule
    ],
    declarations: [
        InventoryPageComponent,
    ]
})
export class InventoryModule { }