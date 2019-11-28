import {Component, OnInit} from '@angular/core';
import {LoopBackAuth, UserModelApi} from 'src/app/shared/lb-sdk';
import {Router} from "@angular/router";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    email: string;
    password: string;
    loading: boolean;
    error: string;
    constructor(private usermodelapi : UserModelApi, private loopBackAuth : LoopBackAuth, private router : Router) {
    }

    matchUser(){
        this.error = '';
        this.loading = true;
        this.usermodelapi.login(
            {
                email: this.email,
                password: this.password
            }).subscribe(token => {
            this.loading = false;
            this.loopBackAuth.setToken(token);
            let redirectUrl = this.getParameterByName('redirectUrl', location.href);

            this.router.navigateByUrl(redirectUrl? redirectUrl : '/');
        }, error => {
            this.error = "Error while logging in";
            this.loading = false;
        });
            };
     getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}
    ngOnInit() {
    }

}
