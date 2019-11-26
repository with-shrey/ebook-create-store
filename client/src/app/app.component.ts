import {Component, OnInit} from '@angular/core';
import {LoopBackAuth} from './shared/lb-sdk/services/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
    isAuthenticated: boolean = false;

    constructor(
        private authService: LoopBackAuth
    ) {
    }

    ngOnInit(): void {
        this.isAuthenticated = !!this.authService.getCurrentUserId();
    }


}
