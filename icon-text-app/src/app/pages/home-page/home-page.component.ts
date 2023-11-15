import { Component, OnInit } from '@angular/core';
import { HomePageTile } from './home-page-tile/home-page-tile.component';

@Component({
  selector: 'home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  public tiles: HomePageTile[] = [{ title: "Inventory", routerPath: "" }, { title: "Billings", routerPath: "" }, { title: "Reports", routerPath: "" }, { title: "Profile", routerPath: "" }]

  constructor() { }

  ngOnInit(): void {
  }

}