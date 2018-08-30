import { Component, OnInit } from '@angular/core';
import {FirebaseService} from '../../../services/firebase.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-home-secretary',
  templateUrl: './home-secretary.component.html',
  styleUrls: ['./home-secretary.component.css']
})
export class HomeSecretaryComponent implements OnInit {

  constructor(private router: Router, private authFirebaseService: FirebaseService) { }

  ngOnInit() {
  }

  logOut() {
    this.authFirebaseService.logOut();
    this.router.navigate(["login"]);
  }

}
