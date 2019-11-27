import {Component, OnInit} from '@angular/core';
import { UserModelApi } from 'src/app/shared/lb-sdk';
import { RouterModule,Routes, Router } from "@angular/router";
@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
    firstName : string;
    lastName : string;
    email : string;
    password: string;
    confirmPass: string;
    constructor(private usermodelapi :  UserModelApi,private router: Router) {
        
    };

    registerUser (){
            console.log("pass"+this.password);
            console.log("ConPas"+this.confirmPass);
            
            if(this.password === this.confirmPass){
            this.usermodelapi.create(
                {firstName  : this.firstName,
                 lastName   : this.lastName,
                 email      : this.email,
                 password   : this.password})
            .subscribe(user=>{});
            this.router.navigate(['auth','login']);
            }
            else{
                console.log("Password doesn't match with confirm password");
            }
        };

    
    ngOnInit(){
    }

}
