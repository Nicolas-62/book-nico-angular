import { Component } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'book-nico-angular';
  constructor(){
	  	  // Your web app's Firebase configuration
		const firebaseConfig = {
		  apiKey: "AIzaSyDpZLqtMeO3COrXRv1t2b5QEo0ZIVQklBc",
		  authDomain: "book-nico-angular.firebaseapp.com",
		  databaseURL: "https://book-nico-angular.firebaseio.com",
		  projectId: "book-nico-angular",
		  storageBucket: "book-nico-angular.appspot.com",
		  messagingSenderId: "468111683132",
		  appId: "1:468111683132:web:65a1c360518b8a4ca31d39"
		};
		firebase.initializeApp(firebaseConfig);
	}
}
