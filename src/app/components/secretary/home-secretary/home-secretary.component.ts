import { Component, OnInit } from '@angular/core';
import {FirebaseService} from '../../../services/firebase.service';
import {Router} from '@angular/router';
import {User} from '../../../models/user';

@Component({
  selector: 'app-home-secretary',
  templateUrl: './home-secretary.component.html',
  styleUrls: ['./home-secretary.component.css']
})
export class HomeSecretaryComponent implements OnInit {

  user: User = {} as User;

  constructor(private router: Router, private authFirebaseService: FirebaseService) {
    this.user = JSON.parse(localStorage.getItem('user'));
  }

  ngOnInit() {
  }

  logOut() {
    this.authFirebaseService.logOut();
    this.router.navigate(["login"]);
    localStorage.removeItem('user');
  }

  goToHomePage() {
    this.router.navigate(["secretary/home"]);
  }

}
