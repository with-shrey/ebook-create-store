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

    constructor(private usermodelapi : UserModelApi, private loopBackAuth : LoopBackAuth, private router : Router) {
    }

    matchUser(){
        this.usermodelapi.login(
            {
                email: this.email,
                password: this.password
            }).subscribe(token => {
            this.loopBackAuth.setToken(token);
            this.router.navigate(['']);
        });
            };

    ngOnInit() {
    }

}
