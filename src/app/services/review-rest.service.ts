import { Injectable } from '@angular/core';
import {ServerUrl} from '../../Variable';
import {HttpClient} from '@angular/common/http';
import {Review} from '../models/review';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReviewRestService {

  apiUserUrl = `${ServerUrl.url}/review`;

  constructor(public http: HttpClient) {
    }

  getByIdLesson(idLesson: number): Observable<Review[]> {
    let request = this.http.get<Review[]>( this.apiUserUrl + "/getByIdLesson/"+idLesson);
    return request;
  }

  getByIdMaterial(idMaterial: number): Observable<Review[]> {
    let request = this.http.get<Review[]>( this.apiUserUrl + "/getByIdMaterial/"+idMaterial);
    return request;
  }
}

