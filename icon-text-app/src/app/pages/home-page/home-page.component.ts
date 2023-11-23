import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { HomePageTile } from './home-page-tile/home-page-tile.component';
import { LoginService } from 'src/app/core-services/login.service';

@Component({
  selector: 'home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomePageComponent implements OnInit {
  public tiles: HomePageTile[] = [
    { title: "Home", routerPath: "/home" },
    { title: "Inventory", routerPath: "/inventory" },
    { title: "Billings", routerPath: "/billings" },
    { title: "Reports", routerPath: "/reports" },
    { title: "Profile", routerPath: "/profile" }
  ]

  constructor(
    private readonly loginService: LoginService,
    private readonly changeDetectorRef: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.loginService.loginResponse.subscribe(() => {
      this.changeDetectorRef.markForCheck();
    });
  }

  public get isUserLogined(): boolean {
    return this.loginService.isLogined();
  }

  public isDisabled(path: string): boolean {
    console.log('disabled', this.isUserLogined);
    if (!this.isUserLogined) {
      switch (path) {
        case '/inventory': return true;
        case '/billings': return true;
        case '/reports': return true;
        case '/profile': return true;
      }
    }
    return false;
  }
}
