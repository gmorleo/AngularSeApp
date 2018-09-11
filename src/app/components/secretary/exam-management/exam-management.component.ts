import { Component, OnInit } from '@angular/core';
import {Course} from '../../../models/course';
import {Exam} from '../../../models/exam';
import {ExamRestService} from '../../../services/exam-rest.service';
import {CourseRestService} from '../../../services/course-rest.service';
import {Validators} from '@angular/forms';
import {Professor} from '../../../models/professor';
import {Room} from '../../../models/room';
import {Teaching} from '../../../models/teaching';
import {MatDialog, MatDialogConfig} from '@angular/material';
import {FormDialogComponent} from '../../common/form-dialog/form-dialog.component';
import {Lesson} from '../../../models/lesson';
import {TeachingRestService} from '../../../services/teaching-rest.service';
import {RoomRestService} from '../../../services/room-rest.service';
import {ResponseDialogComponent} from '../../common/response-dialog/response-dialog.component';
import {DialogBuilder} from '../../../models/dialog-builder';
import {FAIL, NAME, SUCCESS} from '../../../../Variable';

@Component({
  selector: 'app-exam-management',
  templateUrl: './exam-management.component.html',
  styleUrls: ['./exam-management.component.css']
})
export class ExamManagementComponent implements OnInit {

  headers = ['Id', 'Insegnamento', 'Professore','Aula','Data','Orario'];
  courses: Course[];
  exams: Exam[];
  teaching: Teaching[];
  rooms: Room[];
  formConfig = [];

  constructor(private examRestService: ExamRestService,
              private courseRestService: CourseRestService,
              private dialog: MatDialog,
              private teachingRestService: TeachingRestService,
              private roomRestService: RoomRestService) {
    this.reload();
  }


  openNewExamDialog(id: number) {
    const dialogRef = this.dialog.open(FormDialogComponent,this.configInsertDialog());
    dialogRef.afterClosed().subscribe( (newInsertion: Exam) => {
      if (newInsertion){
        console.log(newInsertion);
        this.examRestService.insert(newInsertion).subscribe( res => {
          this.openResponseDialog("Esame", SUCCESS);
          this.reload();
        }, err => {
          this.openResponseDialog("Esame", FAIL);
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
    dialogBuilder.addTitle("Inserisci nuovo esame");
    dialogBuilder.addSelect('','idTeaching','Insegnamento',Validators.required, this.teaching, NAME);
    dialogBuilder.addSelect('','idRoom','Aula',Validators.required, this.rooms, NAME);
    dialogBuilder.addInput("date",'','date','Data',Validators.required);
    dialogBuilder.addInput("time",'','time','Ora',Validators.required);
    return dialogBuilder.getConfigInsertDialog();
  }

  reload() {
    this.getAllCourse();
    this.getAllExam();
    this.getAllTeaching();
    this.getAllRoom();
  }

  getAllExam() {
    this.examRestService.getAll().subscribe( data => {
      this.exams = data;
    })
  }

  getAllCourse() {
    this.courseRestService.getAll().subscribe( data => {
      this.courses = data;
    })
  }

  getAllRoom() {
    this.roomRestService.getAll().subscribe( data => {
      this.rooms = data;
    })
  }

  getAllTeaching() {
    this.teachingRestService.getAll().subscribe( data => {
      this.teaching = data;
    })
  }

  ngOnInit() {
  }

}
