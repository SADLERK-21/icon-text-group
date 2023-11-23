import { Injectable, Inject } from "@angular/core";
import { CanActivate, CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { LoginService } from "./login.service";

@Injectable()
export class AuthGuard
    implements CanActivate, CanActivateChild {
    constructor(
        @Inject(LoginService) private auth: LoginService
    ) {}

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): boolean {
        //return true;
        return this.auth.isLogined();
    }

    canActivateChild(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): boolean {
        //return true;
        return this.canActivate(next, state);
    }
}