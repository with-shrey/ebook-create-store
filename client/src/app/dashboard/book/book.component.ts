import {Component, Input, OnInit} from '@angular/core';
import {Books} from '../../shared/lb-sdk/models';

@Component({
    selector: 'app-book',
    templateUrl: './book.component.html',
    styleUrls: ['./book.component.scss']
})
export class BookComponent implements OnInit {
    @Input() book: Books;

    constructor() {
    }

    ngOnInit() {
    }

}
