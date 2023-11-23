import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'home-page-tile',
  templateUrl: './home-page-tile.component.html',
  styleUrls: ['./home-page-tile.component.scss']
})
export class HomePageTileComponent implements OnInit {

  @Input() public title: string = '';
  @Input() public routerPath: string = '';
  @Input() isDisabled: boolean;

  constructor(
  ) { }

  ngOnInit(): void {
  }

  public get disabledStyle(): string {
    return this.isDisabled ? 'background-color: #444444; color: #6d6d6d; border: 2px solid #444444; pointer-events: none;' : '';
  }
}

export interface HomePageTile {
  title: string,
  routerPath: string
}