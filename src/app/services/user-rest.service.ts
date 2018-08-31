import { Injectable } from '@angular/core';
import {ServerUrl} from '../../Variable';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserRestService {
  apiUserUrl = `${ServerUrl.url}/user`;
  apiStudentUrl = `${ServerUrl.url}/student`;

  constructor(public http: HttpClient) {
  }

  getUserByUid(uid: String) {
    return new Promise( resolve => {
      this.http.get(this.apiUserUrl+"/getByUid/"+uid).subscribe(data =>{
        resolve(data);
      }, err =>{
        console.log(err)
      })
    })
  }


}
