import {Component, Inject, NgZone, OnChanges, OnInit} from '@angular/core';
import {Course} from '../../../models/course';
import {CourseRestService} from '../../../services/course-rest.service';
import {MAT_DIALOG_DATA, MatDialog, MatDialogConfig, MatDialogRef} from '@angular/material';
import {NewCourseDialogComponent} from '../new-course-dialog/new-course-dialog.component';


@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit {

  courses: Course[] = [];
  headers: string[] = ['Id', 'Nome', 'Tipologia', 'Lunghezza', 'Crediti', 'Sede', 'Lingua'];

  constructor(private courseRestService: CourseRestService, public dialog: MatDialog) {

  }

  ngOnInit() {
    this.getAllCourse();
  }

  getAllCourse() {
    this.courseRestService.getAll().subscribe( data => {
      this.courses = data;
    }, err => {
      console.log(err)
    })
  }

  openNewCourseDialog(): void {

    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    const dialogRef = this.dialog.open(NewCourseDialogComponent,dialogConfig);
    dialogRef.afterClosed().subscribe( res => {
      console.log(res);
      this.getAllCourse();
    })
  }

}

