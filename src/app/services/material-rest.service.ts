import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ServerUrl} from '../../Variable';
import {Lesson} from '../models/lesson';
import {Observable} from 'rxjs';
import {Material} from '../models/material';

@Injectable({
  providedIn: 'root'
})
export class MaterialRestService {

  apiUserUrl = `${ServerUrl.url}/material`;

  constructor(public http: HttpClient) {
  }

  getByIdLesson(id: number): Observable<Material[]> {
    let request = this.http.get<Material[]>(this.apiUserUrl + "/getByIdLesson/"+id);
    return request;
  }
}
