import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {NgxEditorModule} from 'ngx-editor';
import {PdfViewerModule} from 'ng2-pdf-viewer';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {SharedModule} from './shared/shared.module';
import {ReaderComponent} from './reader/reader.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {BookComponent} from './dashboard/book/book.component';
import {EditorComponent} from './editor/editor.component';
import {BarRatingModule} from "ngx-bar-rating";
import {FormsModule} from '@angular/forms';
import {TabModule} from "angular-tabs-component";

@NgModule({
    declarations: [
        AppComponent,
        ReaderComponent,
        DashboardComponent,
        BookComponent,
        EditorComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        SharedModule,
        PdfViewerModule,
        NgxEditorModule,
        BarRatingModule,
        FormsModule,
        TabModule
    ],
    providers: [],
    exports: [],
    bootstrap: [AppComponent]
})
export class AppModule {

}