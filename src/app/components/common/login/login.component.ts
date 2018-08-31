import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {FirebaseService} from '../../../services/firebase.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  uname: string;
  password: string;

  constructor(private router: Router, private authFirebaseService: FirebaseService) { }

  ngOnInit() {
  }

  login() {
    event.preventDefault();
    console.log(this.uname+" "+this.password);
    this.authFirebaseService.logInRegular(this.uname,this.password)
      .then( (res) => {
        this.router.navigate( ['secretary']);
      })
      .catch( (err) => console.log('error: ' + err));
  }
}
