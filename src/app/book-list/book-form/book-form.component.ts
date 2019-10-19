import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BooksService } from '../../services/books.service';
import { Book } from '../../models/book.model';

@Component({
  selector: 'app-book-form',
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.css']
})
export class BookFormComponent implements OnInit {

	bookForm: FormGroup;

  constructor(private formBulider: FormBuilder, private booksService: BooksService, private router: Router) { }

  ngOnInit() {
  	this.initForm();
  }
  initForm(){
  	this.bookForm = this.formBulider.group({
  		title: ['', Validators.required],
  		author: ['', Validators.required],
  		synopsis: ''

  	});
	}	
	onSaveBook(){
		const formValue = this.bookForm.value;
		const newBook = new Book(formValue['title'], formValue['author']);
		newBook.synopsis = formValue['synopsis'];
		this.booksService.createNewBook(newBook);
		this.router.navigate['/books'];
	}
}
