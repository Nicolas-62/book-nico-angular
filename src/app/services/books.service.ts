import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Book } from '../models/book.model';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class BooksService {

	books: Book[] = [];
	booksSubject = new Subject<Book[]>();

	// getBooks est appelé chaque fois que la liste en bdd est modifiée, tt les appareils ont ainsi
	// une liste à jour
  constructor() { 
  	this.getBooks();
  }

  emitBooks(){
  	this.booksSubject.next(this.books);
  }

  saveBooks(){
  	firebase.database().ref('/books').set(this.books);
  }
  /*Le premier argument  'value'  demande à Firebase d'exécuter le callback à chaque 
  modification de valeur enregistrée au endpoint choisi : cela veut dire que si vous 
  modifiez quelque chose depuis un appareil, la liste sera automatiquement mise à jour 
  sur tous les appareils connectés.
  */
  getBooks(){
  	firebase.database().ref('/books').on('value', (data: firebase.database.DataSnapshot) => {

  			this.books = data.val() ? data.val() : [];
  			console.log('books service, getBooks : '+this.books);
  			this.emitBooks();
  		} 
  	);
  }
  /* once() retourne une promesse */
  getSingleBook(id: number){
  	return new Promise( 
  		(resolve, reject) => {
  			firebase.database().ref('/books/'+ id).once('value').then(
	  			(data: firebase.database.DataSnapshot) => {
	  				resolve(data.val());
	  			},
	  			(error) => {
	  				reject(error);
  			})
			}
		);
  }
  createNewBook(book: Book){
  	this.books.push(book);
  	this.saveBooks();
  	this.emitBooks();
  }
  removeBook(book: Book){
  	const bookIndexToRemove = this.books.findIndex(
  		(bookE1) => {
  			if(bookE1 === book){
  				return true;
  			}
  		}
  	);
  	/* remove 1 element at index 'bookIndexToRemove' */
  	this.books.splice(bookIndexToRemove, 1);
  	this.saveBooks();
  	this.emitBooks();

  }

}
