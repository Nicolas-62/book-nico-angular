import { Injectable } from '@angular/core';
import * as firebase from 'firebase';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  pseudo: string;

  constructor() { }
  /*Ensuite, créez la méthode  createNewUser()  pour créer un nouvel utilisateur, 
  	qui prendra comme argument une adresse mail et un mot de passe, 
  	et qui retournera une Promise qui résoudra si la création réussit, 
  	et sera rejetée avec le message d'erreur si elle ne réussit pas : */
  createNewUser(email: string, password: string){
  	return new Promise((resolve, reject) => {
  		firebase.auth().createUserWithEmailAndPassword(email, password).then(
  			() => {
          var pseudo = email.split('@');
          this.pseudo = pseudo[0];
  				resolve();
  			},
  			(error) => {
  				reject(error);
  			}
  		);
  	});
  }
  signInUser(email: string, password: string){
  	return new Promise((resolve, reject) => {
  		firebase.auth().signInWithEmailAndPassword(email, password).then(
  			() => {
          var pseudo = email.split('@');
          this.pseudo = pseudo[0];
  				resolve();
  			},
  			(error) => {
  				reject(error);
  			}
  		);
  	});
  }
  signOutUser(){
  	firebase.auth().signOut();
  }
}
