import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'home-page-tile',
  templateUrl: './home-page-tile.component.html',
  styleUrls: ['./home-page-tile.component.scss']
})
export class HomePageTileComponent implements OnInit {

  @Input() public title: string = '';
  @Input() public routerPath: string = '';

  constructor(
  ) { }

  ngOnInit(): void {
  }

}

export interface HomePageTile {
  title: string,
  routerPath: string
}