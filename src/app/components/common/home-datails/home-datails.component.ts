import { Component, OnInit } from '@angular/core';
import {FirebaseService} from '../../../services/firebase.service';
import {User} from '../../../models/user';
import {Router} from '@angular/router';

@Component({
  selector: 'app-home-datails',
  templateUrl: './home-datails.component.html',
  styleUrls: ['./home-datails.component.css']
})
export class HomeDatailsComponent implements OnInit {

  user: User = {} as User;

  constructor(private router: Router, private authFirebaseService: FirebaseService) {
    this.user = JSON.parse(localStorage.getItem('user'));
  }

  ngOnInit() {
  }


}
