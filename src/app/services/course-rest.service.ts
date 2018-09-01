import { Injectable } from '@angular/core';
import {ServerUrl} from '../../Variable';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CourseRestService {
  apiUserUrl = `${ServerUrl.url}/course`;

  constructor(public http: HttpClient) {
  }

  getAll() {
    return new Promise(resolve => {
      this.http.get(this.apiUserUrl + "/getAll").subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err)
      })
    })
  }
}
