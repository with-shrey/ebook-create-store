import {Component, OnInit} from '@angular/core';
import {LoopBackAuth} from './shared/lb-sdk/services/core';
import {UserModelApi} from './shared/lb-sdk/services/custom';
import {UserModel} from './shared/lb-sdk/models';
import {NavigationEnd, Router} from '@angular/router';
import { LoopBackConfig } from './shared/lb-sdk';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
    isAuthenticated: boolean = false;
    user: UserModel;
    navExpanded = false;
    constructor(
        private authService: LoopBackAuth,
        private userApi: UserModelApi,
        private router: Router
    ) {
    }

    ngOnInit(): void {
        LoopBackConfig.setBaseURL(location.origin);
        this.isAuthenticated = !!this.authService.getCurrentUserId();
        this.user = <UserModel>this.authService.getCurrentUserData();
        this.router.events.subscribe((val) => {
            if (val instanceof NavigationEnd) {
                this.isAuthenticated = !!this.authService.getCurrentUserId();
                this.user = <UserModel>this.authService.getCurrentUserData();
            }
        });

    }


    logout() {
        this.authService.clear();
        this.router.navigate(['auth', 'login'])

    }
}
