import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import { Observable } from 'rxjs';
import {FirebaseService} from '../services/firebase.service';
import {UserRestService} from '../services/user-rest.service';
import {Value} from '../../Variable';

@Injectable({
  providedIn: 'root'
})
export class AuthProfessorGuard implements CanActivate {

  userType: number;

  constructor(private router: Router, private authFirebaseService: FirebaseService, private userRestService: UserRestService) {

  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return new Promise((resolve, reject) => {
      this.authFirebaseService.getCurrentUser()
        .then(user => {
          console.log(localStorage.getItem('userType'));
          this.userType = parseInt(localStorage.getItem('userType'));
          if ( this.userType == Value.professor ) {
            return resolve(true);
          } else {
            return resolve(false);
          }
        }, err => {
          this.router.navigate(['/login']);
          return resolve(false);
        })
    })
  }
}
