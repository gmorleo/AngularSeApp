import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {FirebaseService} from '../../../services/firebase.service';
import {UserRestService} from '../../../services/user-rest.service';
import {User} from '../../../models/user';
import {resolve} from 'q';
import {Value} from '../../../../Variable';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  uname: string;
  password: string;
  uid: string;
  user: User = {} as User;
  userType: number;

  constructor(private router: Router, private authFirebaseService: FirebaseService, private userRestService: UserRestService) { }

  ngOnInit() {
    this.userType = parseInt(JSON.parse(localStorage.getItem('userType')));
    console.log(this.userType);
    if (this.userType == 2) {
      this.router.navigate(['secretary']);
    }
    if (this.userType == 3) {
      this.router.navigate(['professor']);
    }
  }

  login() {
    event.preventDefault();
    this.authFirebaseService.logInRegular(this.uname,this.password)
      .then( res => {
        if(res) {
          console.log(res.user.uid);
          this.getUserType(res.user.uid);
        }
      })
      .catch( (err) => console.log('error: ' + err));
  }

  getUserType(uid: string) {
    this.userRestService.getUserByUid(uid)
      .then( data => {
        this.user = data;
        console.log(data);
        localStorage.setItem( 'userType', JSON.stringify(this.user.userType));
        localStorage.setItem( 'user', JSON.stringify(this.user));
        if ( this.user.userType == Value.professor) {
          this.router.navigate(['professor'])
        } else {
          this.router.navigate(['secretary'])
        }
      })
      .catch( (err) => console.log('error: ' + err));
  }

}
