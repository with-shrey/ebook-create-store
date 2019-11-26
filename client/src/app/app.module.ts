import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {SharedModule} from './shared/shared.module';
import {ReaderComponent} from './reader/reader.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {BookComponent} from './dashboard/book/book.component';

@NgModule({
    declarations: [
        AppComponent,
        ReaderComponent,
        DashboardComponent,
        BookComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        SharedModule
    ],
    providers: [],
    exports: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
