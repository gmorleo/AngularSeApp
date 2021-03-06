import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import { Observable } from 'rxjs';
import {FirebaseService} from '../services/firebase.service';
import {el} from '@angular/platform-browser/testing/src/browser_util';
import {UserRestService} from '../services/user-rest.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private authFirebaseService: FirebaseService, private userRestService: UserRestService) {

  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return new Promise((resolve, reject) => {
      this.authFirebaseService.getCurrentUser()
        .then(user => {
          console.log(user);
          return resolve(true);
        }, err => {
          this.router.navigate(['/login']);
          return resolve(false);
        })
    })
  }
}
