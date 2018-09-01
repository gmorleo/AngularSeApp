import { Component, OnInit } from '@angular/core';
import {Course} from '../../../models/course';
import {CourseRestService} from '../../../services/course-rest.service';
import {MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-new-course-dialog',
  templateUrl: './new-course-dialog.component.html',
  styleUrls: ['./new-course-dialog.component.css']
})
export class NewCourseDialogComponent implements OnInit {

  newCourse: Course = {} as Course;

  constructor(private courseRestService: CourseRestService, private dialogRef: MatDialogRef<NewCourseDialogComponent>) { }

  ngOnInit() {
  }

  close() {
    this.dialogRef.close();
  }

  save() {
    console.log(this.newCourse);
    this.courseRestService.insertNewCourse(this.newCourse).subscribe( res => {
      console.log(res);
      this.dialogRef.close(res);
    }, err => {
      console.log(err)
    });
  }

}
