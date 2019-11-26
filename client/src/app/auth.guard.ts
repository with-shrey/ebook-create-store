import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {LoopBackAuth} from './shared/lb-sdk/services/core';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    constructor(private authService: LoopBackAuth,
                private router: Router,
    ) {
    }

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        return this.isAuthenticated(state.url, next);
    }

    isAuthenticated(url, route: ActivatedRouteSnapshot): boolean {
        const userId = this.authService.getCurrentUserId();
        if (!userId) {
            this.router.navigate(['auth', 'login'], {queryParams: {redirectUrl: url}});
        } else {
            if (route.data && route.data.roles) {
                const role = this.authService.getCurrentUserData().roles[0].name;
                const isAuthorized = route.data.roles.includes(role);
                // if (!isAuthorized)
                // this.router.navigate(['/']);
                return isAuthorized;
            }
            return true;
        }
    }
}
