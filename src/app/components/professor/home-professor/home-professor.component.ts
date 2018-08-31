import { Component, OnInit } from '@angular/core';
import {FirebaseService} from '../../../services/firebase.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-home-professor',
  templateUrl: './home-professor.component.html',
  styleUrls: ['./home-professor.component.css']
})
export class HomeProfessorComponent implements OnInit {

  constructor(private router: Router, private authFirebaseService: FirebaseService) { }

  ngOnInit() {
  }

  logOut() {
    this.authFirebaseService.logOut();
    this.router.navigate(["login"]);
    localStorage.removeItem('user');
  }

}
