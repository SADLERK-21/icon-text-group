import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { HomePageComponent } from "./home-page.component";
import { HttpClientModule } from '@angular/common/http'
import { HomePageTileComponent } from "./home-page-tile/home-page-tile.component";
import { Routes, RouterModule } from "@angular/router";

const routes: Routes = [
    { path: '', component: HomePageComponent },
    { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
    imports: [
        HttpClientModule,
        RouterModule.forChild(routes),
        CommonModule
    ],
    declarations: [
        HomePageComponent,
        HomePageTileComponent
    ]
})
export class HomeModule { }