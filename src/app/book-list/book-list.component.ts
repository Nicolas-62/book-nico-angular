import { Component, OnInit } from '@angular/core';
import { BooksService } from '../services/books.service';
import { Subscription } from 'rxjs/Subscription';
import { Router } from '@angular/router';
import { Book } from '../models/book.model';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {

	booksSubscription: Subscription;
	bookList: any[];

	// création d'un attribut privé booksService
  constructor(private booksService: BooksService, private router: Router) { }

  ngOnInit() {
  	this.booksSubscription = this.booksService.booksSubject.subscribe(
  		(books: any[]) => {
  			this.bookList = books;
  		}
  	);
  	this.booksService.emitBooks();
  }
  onViewBook(index: number){
  	this.booksService.getSingleBook(index).then(
  		() => {
  			this.router.navigate(['/books', 'view', index]);
  		}
  	);
  }
  onNewBook(){
  	this.router.navigate(['/books', 'new']);
  }
  onDeleteBook(book: Book){
  	this.booksService.removeBook(book);
  }
  ngOnDestroy(){
  	this.booksSubscription.unsubscribe();
  }

}
