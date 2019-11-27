import {Component, HostListener, OnInit} from '@angular/core';
import {Books, UserBookProgress} from '../shared/lb-sdk/models';
import {BooksApi, UserModelApi} from '../shared/lb-sdk/services/custom';
import {ActivatedRoute} from '@angular/router';
import {LoopBackAuth} from '../shared/lb-sdk/services/core';
import {debounceTime} from 'rxjs/operators';
import {Observable, Subject} from 'rxjs';

@Component({
    selector: 'app-reader',
    templateUrl: './reader.component.html',
    styleUrls: ['./reader.component.scss']
})
export class ReaderComponent implements OnInit {
    book: Books = new Books();
    userBook: UserBookProgress = new UserBookProgress();
    loading: boolean = false;
    error: string;
    startTracking = false;
    bookId: string = '';
    debouncedUpdate: Observable<any> = new Subject();

    constructor(
        private booksApi: BooksApi,
        private route: ActivatedRoute,
        private authService: LoopBackAuth,
        private userApi: UserModelApi,
    ) {
    }

    onProgress({loaded, total}) {
        let percent = loaded * 100.0 / total;
        if (percent >= 100) {
            percent = 100;
            this.startTracking = true

        }

    }

    ngOnInit() {
        this.userBook.progress = 0;
        this.bookId = this.route.snapshot.paramMap.get('bookId');
        this.loading = true;
        this.booksApi.findOne({
            where: {
                id: this.bookId
            }
        }).subscribe((book: Books) => {
            console.log(book);
            this.book = book;
            if (book) {
                this.markAsRead();
            } else {
                this.error = 'Book Not Found';
            }
        }, error => {
            this.error = 'Error Loading Book';
            this.loading = false;
        });
    }

    markAsRead() {
        this.userApi.markBookRead(
            this.authService.getCurrentUserId(),
            this.bookId
        ).subscribe(status => {
            this.userBook = status;
            this.debouncedUpdate = this.userApi.updateByIdUserBookProgress(
                this.authService.getCurrentUserId(),
                this.userBook.id,
                this.userBook
            ).pipe(debounceTime(1000));
        })
    }

    @HostListener("window:scroll", [])
    onWindowScroll() {
        let number = 100 * document.documentElement.scrollTop / (document.documentElement.scrollHeight - document.documentElement.clientHeight);
        this.userBook.progress = Math.ceil(number);
        this.debouncedUpdate.subscribe(() => {
        }, console.error);
    }
}
