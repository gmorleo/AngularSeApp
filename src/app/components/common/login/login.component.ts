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

  constructor(private router: Router, private authFirebaseService: FirebaseService, private userRestService: UserRestService) { }

  ngOnInit() {
  }

  login() {
    event.preventDefault();
    this.authFirebaseService.logInRegular(this.uname,this.password)
      .then( res => {
        if(res) {
          console.log(res.user.uid);
          this.getUserType(res.user.uid);
        }
        this.router.navigate( ['secretary']);
      })
      .catch( (err) => console.log('error: ' + err));
  }

  getUserType(uid: string) {
    this.userRestService.getUserByUid(uid)
      .then( data => {
        this.user = data;
        console.log(data);
        localStorage.setItem( 'user', JSON.stringify(this.user.userType));
        console.log(localStorage.getItem('user'));
        if ( this.user.userType == Value.professor) {
          this.router.navigate(['professor'])
        } else {
          this.router.navigate(['secretary'])
        }
      })
      .catch( (err) => console.log('error: ' + err));
  }

}
