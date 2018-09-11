import { Injectable } from '@angular/core';
import {ServerUrl} from '../../Variable';
import {HttpClient} from '@angular/common/http';
import {Course} from '../models/course';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CourseRestService {
  apiUserUrl = `${ServerUrl.url}/course`;

  constructor(public http: HttpClient) {
  }

  getAll():Observable<Course[]> {
    let request = this.http.get<Course[]>(this.apiUserUrl + "/getAll");
    return request;
  }

  insertNewCourse(course: Course):Observable<Course> {
    let request = this.http.post<Course>(this.apiUserUrl + "/save", {
      "name": course.name,
      "type": course.type,
      "lenght": course.lenght,
      "credits": course.credits,
      "location": course.location,
      "language": course.language
    });
    return request;
  }
}
