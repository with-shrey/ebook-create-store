import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SDKBrowserModule} from './lb-sdk';

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        SDKBrowserModule.forRoot(),
    ],
    exports: [
        SDKBrowserModule,
    ]
})
export class SharedModule {
}
