import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ServerUrl} from '../../Variable';
import {Observable} from 'rxjs';
import {Professor} from '../models/professor';
import {Course} from '../models/course';

@Injectable({
  providedIn: 'root'
})
export class ProfessorRestService {
  apiUserUrl = `${ServerUrl.url}/professor`;

  constructor(public http: HttpClient) {
  }

  getAll(): Observable<Professor[]> {
    let request = this.http.get<Professor[]>(this.apiUserUrl+"/getAll");
    return request;
  }

  insertNewProfessor(professor: Professor):Observable<Professor> {
    let request = this.http.post<Professor>(this.apiUserUrl + "/save", {
      "name": professor.name,
      "surname": professor.surname,
      "password": professor.password,
      "email": professor.email,
      "age": professor.age,
      "uid": professor.uid,
      "userType":professor.userType,
      "course": professor.course
    });
    return request;
  }
}
