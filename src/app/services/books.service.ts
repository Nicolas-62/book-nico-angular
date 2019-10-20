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
    if(book.photo) {
      const storageRef = firebase.storage().refFromURL(book.photo);
      storageRef.delete().then(
        () => {
          console.log('Photo removed!');
        },
        (error) => {
          console.log('Could not remove photo! : ' + error);
        }
      );
    }
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
	uploadFile(file: File) {
    return new Promise(
      (resolve, reject) => {
      	// nom de fichier unique
        const almostUniqueFileName = Date.now().toString();
        // creation d'une tache de chargement 'upload'
        const upload = firebase.storage().ref()
          .child('images/' + almostUniqueFileName + file.name).put(file);
        // suivi de l'état du chargement
        upload.on(firebase.storage.TaskEvent.STATE_CHANGED,
        	// déclanché quand le chargement est lancé
          () => {
            console.log('Chargement…');
          },
          (error) => {
            console.log('Erreur de chargement ! : ' + error);
            reject();
          },
          // déclanché quand le chargement est terminé, retourne l'URL unique du fichier chargé
          () => {
            resolve(upload.snapshot.ref.getDownloadURL());
          }
        );
      }
    );
	}
}
