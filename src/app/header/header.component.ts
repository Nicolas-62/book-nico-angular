import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import * as firebase from 'firebase';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

	isAuth: boolean;

  constructor(private authService: AuthService) { }
/*Ici, vous utilisez  onAuthStateChanged() , 
qui permet d'observer l'état de l'authentification de l'utilisateur : 
à chaque changement d'état, la fonction que vous passez en argument est exécutée.*/
  ngOnInit() {
  	firebase.auth().onAuthStateChanged(
  		(user) => {
  			if(user){
  				this.isAuth = true;
  			}else{
  				this.isAuth = false;
  			}
  		} 		
  	);
  }
  onSignOut(){
  	this.authService.signOutUser();
  }
}
