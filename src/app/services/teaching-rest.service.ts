import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ServerUrl} from '../../Variable';
import {Observable} from 'rxjs';
import {Room} from '../models/room';
import {Teaching} from '../models/teaching';

@Injectable({
  providedIn: 'root'
})
export class TeachingRestService {

  apiUserUrl = `${ServerUrl.url}/teaching`;

  constructor(public http: HttpClient) {
  }

  getAll(): Observable<Teaching[]> {
    let request = this.http.get<Teaching[]>(this.apiUserUrl + "/getAll");
    return request;
  }

  insertNewTeaching(teaching: Teaching):Observable<Teaching> {
    let request = this.http.post<Teaching>(this.apiUserUrl + "/save", {
      "name": teaching.name,
      "credits": teaching.credits,
      "year": teaching.year,
      "idCourse": teaching.idCourse,
      "idProfessor": teaching.idProfessor
    });
    return request;
  }

}
