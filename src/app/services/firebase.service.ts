///<reference path="../../../node_modules/angularfire2/auth/auth.d.ts"/>
import { Injectable } from '@angular/core';
import {AngularFireAuth} from 'angularfire2/auth';
import UserCredential = firebase.auth.UserCredential;
import {User} from 'firebase';
import {Observable} from 'rxjs';
import * as firebase from 'firebase/app';
import {UserRestService} from './user-rest.service';
import {promise} from 'selenium-webdriver';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(private afAuth: AngularFireAuth) {
  }

  public logInRegular(email: string, password: string): Promise<void | UserCredential> {

    return this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // [START_EXCLUDE]
      if (errorCode === 'auth/wrong-password') {
        alert('Wrong password.');
      } else {
        alert(errorMessage);
      }
      console.log(error);
    });
  }

  logOut() {
    this.afAuth.auth.signOut();
  }

/*  getCurrentUser(){
    return new Promise<any>((resolve, reject) => {
      var user = firebase.auth().onAuthStateChanged(function(user){
        if (user) {
          console.log("User firebase");
          resolve(user);
        } else {
          reject('No user logged in');
        }
      })
    })
  }*/

  getCurrentUser(){
    return new Promise<any>((resolve, reject) => {
      var user = firebase.auth().onAuthStateChanged(function(user){
        if (user) {
          resolve(user);
        } else {
          reject('No user logged in');
        }
      })
    })
  }


}
