import {Component, OnInit} from '@angular/core';
import {UserModelApi} from 'src/app/shared/lb-sdk';
import {Router} from "@angular/router";

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPass: string;
    loading: boolean;
    error: string;
    constructor(private usermodelapi :  UserModelApi,private router: Router) {

    };

    registerUser (){
        this.error = '';
        this.loading = true;
        console.log("pass" + this.password);
            console.log("ConPas"+this.confirmPass);

        if(this.password === this.confirmPass) {
            this.usermodelapi.create(
                {
                    firstName: this.firstName,
                    lastName: this.lastName,
                    email: this.email,
                    password: this.password
                })
                .subscribe(user => {
                    this.loading = false;
                    this.router.navigate(['auth', 'login']);
                }, error => {
                    this.error = "Error while registering user"
                    this.loading = false;
                });

        }
            else{
                console.log("Password doesn't match with confirm password");
            }
        };


    ngOnInit(){
    }

}
