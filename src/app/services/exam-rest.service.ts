import { Injectable } from '@angular/core';
import {ServerUrl} from '../../Variable';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Lesson} from '../models/lesson';
import {Exam} from '../models/exam';

@Injectable({
  providedIn: 'root'
})
export class ExamRestService {

  apiUserUrl = `${ServerUrl.url}/exam`;

  constructor(public http: HttpClient) {
  }

  getAll(): Observable<Exam[]> {
    let request = this.http.get<Exam[]>(this.apiUserUrl + "/getAll");
    return request;
  }

}
