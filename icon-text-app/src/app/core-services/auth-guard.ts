import { Injectable, Inject } from "@angular/core";
import { CanActivate, CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { LoginRegisterUserService } from "./login-register-user.service";

@Injectable()
export class AuthGuard
    implements CanActivate, CanActivateChild {
    constructor(
        @Inject(LoginRegisterUserService) private auth: LoginRegisterUserService
    ) { }

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): boolean {
        return this.auth.isLogined();
    }

    canActivateChild(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): boolean {
        return this.canActivate(next, state);
    }
}