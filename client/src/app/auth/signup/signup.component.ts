import {Component, OnInit} from '@angular/core';
import { UserModelApi } from 'src/app/shared/lb-sdk';

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
    constructor(private usermodelapi :  UserModelApi) {
        
    };

    registerUser (){
            if(this.password == this.confirmPass){
            this.usermodelapi.create(
                {firstName  : this.firstName,
                 lastName   : this.lastName,
                 email      : this.email,
                 password   : this.password})
            .subscribe(user=>{});
            }
            else{
                console.log("Password doesn't match with confirm password");
            }
        };

    
    ngOnInit(){
    }

}
