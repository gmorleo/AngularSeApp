import {Component, Inject, NgZone, OnInit} from '@angular/core';
import {Course} from '../../../models/course';
import {CourseRestService} from '../../../services/course-rest.service';
import {MAT_DIALOG_DATA, MatDialog, MatDialogConfig, MatDialogRef} from '@angular/material';

export interface DialogData {
  name: string;
  type: string;
  lenght: number;
  credits: number;
  location: string;
  language: string;
}

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit {

  courses: Course[] = [];
  newCourse: Course;
  headers: string[] = ['Id', 'Nome', 'Tipologia', 'Lunghezza', 'Crediti', 'Sede', 'Lingua'];

  constructor(private courseRestService: CourseRestService, public dialog: MatDialog) { }

  ngOnInit() {
    this.getAllCourse();
  }

  getAllCourse() {
    this.courseRestService.getAll().then( (data: Course[]) => {
      this.courses = data;
      console.log(this.courses);
    })
  }

  openNewCourseDialog(): void {

    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    this.dialog.open(newCourseDialog,dialogConfig);

/*    const dialogRef = this.dialog.open(newCourseDialog, {
      width: '250px',
      data: {name: 'ciao', type: 'hola'}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      /!*this.animal = result;*!/
      console.log(result);
    });*/
  }

}

@Component({
  selector: 'new-course-dialog',
  templateUrl: 'new-course-dialog.html',
})
export class newCourseDialog {

  constructor(
    public dialogRef: MatDialogRef<newCourseDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}
