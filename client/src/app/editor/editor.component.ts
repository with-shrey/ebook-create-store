import {Component, OnInit} from '@angular/core';
import {Books} from '../shared/lb-sdk/models';
import {BooksApi, UserModelApi} from '../shared/lb-sdk/services/custom';
import {LoopBackAuth} from '../shared/lb-sdk/services/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Router} from '@angular/router';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit {
  book: Books = new Books();
  fileName = '';
  error = '';
  loading: boolean = false;
  file: File = null;

  constructor(
      private http: HttpClient,
      private authService: LoopBackAuth,
      private userApi: UserModelApi,
      private booksApi: BooksApi,
      private router: Router
  ) {
  }

  ngOnInit() {
    this.userApi.createBooks(
        this.authService.getCurrentUserId(),
        this.book
    )
  }

  fileChange(event) {
    let fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      this.file = <File>fileList[0];
      this.fileName = this.file.name;
    }
  }

  storeUsingFile() {
    this.error = '';
    if (!this.file) {
      this.error = "Select a File First";
      return;
    }
    if (!this.book.title) {
      this.error = "Title is Compulsory";
      return;
    }
    this.loading = true;
    //addByPDF
    let formData: FormData = new FormData();
    let params = new HttpParams();
    formData.append('file', this.file);
    params = params.append('title', this.book.title);
    let headers = new Headers();
    /** In Angular 5, including the header Content-Type can invalidate your request */
    headers.append('Content-Type', 'multipart/form-data');
    headers.append('Accept', 'application/json');
    this.http.post(`http://localhost:3000/api/Books/addByPDF?${params.toString()}`, formData)
        .subscribe(
            data => {
              this.loading = false;
              this.router.navigate(['']);
              console.log(data)
            },
            error => {
              this.loading = false;
              console.log(error)
            }
        )
  }

  storeUsingEditor() {
    this.error = '';
    if (!this.book.title) {
      this.error = "Title is Compulsory";
      return;
    }
    if (!this.book.content) {
      this.error = "Content is Compulsory";
      return;
    }
    this.loading = true;
    this.booksApi.addByContent(this.book.title, this.book.content).subscribe(data => {
      console.log(data);
      this.loading = false;
      this.router.navigate([''])
    });
  }

}
