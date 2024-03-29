import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate{

  constructor(private router: Router) { }

  canActivate(): Promise<boolean> | boolean{
  	return new Promise((resolve, reject) => {
  		firebase.auth().onAuthStateChanged(
  			(user) => {
  				if(user){
  					resolve(true);
  				}else{
  					this.router.navigate(['/auth', 'signin']);
  					reject(false);
  				}
  			});
  	});
  }
}
