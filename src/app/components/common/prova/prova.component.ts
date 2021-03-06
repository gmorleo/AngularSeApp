import { Component, OnInit } from '@angular/core';
import {FirebaseService} from '../../../services/firebase.service';
import {User} from '../../../models/user';
import {Router} from '@angular/router';

@Component({
  selector: 'app-prova',
  templateUrl: './prova.component.html',
  styleUrls: ['./prova.component.css']
})
export class ProvaComponent implements OnInit {

  user: User = {} as User;

  constructor(private router: Router, private authFirebaseService: FirebaseService) {
    this.user = JSON.parse(localStorage.getItem('user'));
  }

  ngOnInit() {
  }

}
