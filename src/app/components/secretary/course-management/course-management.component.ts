import { Component, OnInit } from '@angular/core';
import {Course} from '../../../models/course';
import {CourseRestService} from '../../../services/course-rest.service';
import {Validators} from '@angular/forms';
import {MatDialog} from '@angular/material';
import {FormDialogComponent} from '../../common/form-dialog/form-dialog.component';
import {DialogBuilder} from '../../../models/dialog-builder';
import {ResponseDialogComponent} from '../../common/response-dialog/response-dialog.component';
import {FAIL, SUCCESS} from '../../../../Variable';

@Component({
  selector: 'app-course-management',
  templateUrl: './course-management.component.html',
  styleUrls: ['./course-management.component.css']
})
export class CourseManagementComponent implements OnInit {

  courses: Course[];

  constructor(private courseRestService: CourseRestService,
              private dialog: MatDialog) {
    this.reload();
  }

  openNewCourseDialog(){
    const dialogRef = this.dialog.open(FormDialogComponent,this.configInsertDialog());
    dialogRef.afterClosed().subscribe( (newInsertion: Course) => {
      if (newInsertion){
        console.log(newInsertion);
        this.courseRestService.insertNewCourse(newInsertion).subscribe( res => {
          this.openResponseDialog("Corso", SUCCESS);
          this.reload();
        }, err => {
          this.openResponseDialog("Corso", FAIL);
        });
      }
    })
  }

  openResponseDialog(name: string, res: number) {
    const responseDialog = this.dialog.open(ResponseDialogComponent, this.configResponseDialog(name, res));
  }

  configResponseDialog(name: string, res: number) {
    var dialogBuilder = new DialogBuilder();
    dialogBuilder.addResponse(name,res);
    return dialogBuilder.getConfigResponseDialog();
  }

  configInsertDialog() {
    var dialogBuilder = new DialogBuilder();
    dialogBuilder.addTitle("Inserisci nuovo corso");
    dialogBuilder.addInput("text",'','name','Nome del Corso',Validators.required);
    dialogBuilder.addInput("text",'','type','Tipologia',Validators.required);
    dialogBuilder.addInput("number",'','lenght','Lunghezza in anni',Validators.required);
    dialogBuilder.addInput("number",'','credits','Crediti totali',Validators.required);
    dialogBuilder.addInput("text",'','location','Sede',Validators.required);
    dialogBuilder.addInput("text",'','language','Lingua',Validators.required);
    return dialogBuilder.getConfigInsertDialog();
  }

  reload(){
    this.getAllCourse();
  }

  getAllCourse() {
    this.courseRestService.getAll().subscribe( course => {
      this.courses = course;
    })
  }

  ngOnInit() {
  }

}
