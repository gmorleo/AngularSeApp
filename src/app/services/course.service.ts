import { Injectable } from '@angular/core';
import {Course} from '../models/course';
import {CourseRestService} from './course-rest.service';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  constructor(private courseRestService: CourseRestService) { }

  getAll(): Observable<Course[]> {
    var courses$: Observable<Course[]>;
    courses$ = this.courseRestService.getAll();
    return courses$;
  }
}
