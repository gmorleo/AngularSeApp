import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ServerUrl} from '../../Variable';
import {Observable} from 'rxjs';
import {Student} from '../models/student';
import {Professor} from '../models/professor';

@Injectable({
  providedIn: 'root'
})
export class StudentRestService {

  apiUserUrl = `${ServerUrl.url}/student`;

  constructor(public http: HttpClient) {
  }

  getAll(): Observable<Student[]> {
    let request = this.http.get<Student[]>(this.apiUserUrl+"/getAll");
    return request;
  }

  getByCourse(idCourse: number) {
    let request = this.http.get<Student[]>(this.apiUserUrl+"/getByCourse/"+idCourse);
    return request;
  }

  insertNewStudent(student: Student):Observable<Student> {
    let request = this.http.post<Student>(this.apiUserUrl + "/save", {
      "name": student.name,
      "surname": student.surname,
      "password": student.password,
      "email": student.email,
      "age": student.age,
      "uid": student.uid,
      "userType": student.userType,
      "matricola": student.matricola,
      "year": student.year,
      "yearStart": student.yearStart,
      "idCourse": student.idCourse
    });
    return request;
  }
}
