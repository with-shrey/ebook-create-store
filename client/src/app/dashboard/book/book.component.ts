import {Component, Input, OnInit} from '@angular/core';
import {Books, UserBookProgress} from '../../shared/lb-sdk/models';
import {UserBookProgressApi} from '../../shared/lb-sdk/services/custom';

@Component({
    selector: 'app-book',
    templateUrl: './book.component.html',
    styleUrls: ['./book.component.scss']
})
export class BookComponent implements OnInit {
    @Input() book: Books;
    @Input() userBookProgress: UserBookProgress;
    @Input() rating: number;

    constructor(
        private userBookProgressApi: UserBookProgressApi
    ) {
    }

    ngOnInit() {
    }

    ratingChanged($event: number) {
        if (this.userBookProgress) {
            this.userBookProgressApi.patchAttributes(this.userBookProgress.id, {
                rating: $event
            }).subscribe(console.log, console.error)
        }
    }
}
