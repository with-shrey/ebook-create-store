import {Component} from '@angular/core';
import {BooksApi} from './shared/lb-sdk/services/custom';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    title = 'client';

    constructor(private booksApi: BooksApi) {
        booksApi.
    }
}
