import {Component, OnInit} from '@angular/core';
import {BooksApi, UserBookProgressApi, UserModelApi} from '../shared/lb-sdk/services/custom';
import {Books, UserBookProgress} from '../shared/lb-sdk/models';
import {LoopBackAuth} from '../shared/lb-sdk/services/core';
import {count} from 'rxjs/operators';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
    loading: number = 0;
    books: Books[] = [];
    userBooks: UserBookProgress[] = [];
    isAuthenticated: boolean = false;
    userId: string = "";
    filter = {
        limit: 8,
        skip: -8
    };
    private bookCount: number = 0;

    constructor(
        private booksApi: BooksApi,
        private userApi: UserModelApi,
        private loopbackAuth: LoopBackAuth
    ) {
    }

    ngOnInit() {
        this.isAuthenticated = !!this.loopbackAuth.getCurrentUserId();
        this.userId = this.loopbackAuth.getCurrentUserId();
        if (this.isAuthenticated) {
            this.loading++;
            this.userApi.getUserBookProgress(this.userId, {
                include: 'books'
            }).subscribe((userBooks: UserBookProgress[]) => {
                this.userBooks = userBooks;
                this.loading--;
            })
        }
        this.booksApi.count().subscribe(({count}) => this.bookCount = count);
        this.loadBooks();

    }

    loadBooks() {
        this.filter.skip += this.filter.limit;
        this.loading++;
        this.booksApi.find(this.filter)
            .subscribe((books: Books[]) => {
                this.books.push(...books);
                this.loading--;
            })
    }
}
