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

  }

  ngOnInit() {
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
    }, err => {
      console.log(err)
    })
  }

  getAllTeaching() {
    this.teachingRestService.getAll().subscribe( data => {
      this.teaching = data;
    }, err => {
      console.log(err)
    })
  }

  configDialog(title: string) {
    this.initForm();
    var dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      title: title,
      element: this.formConfig,
    };
    return dialogConfig;
  }

  initForm() {
    this.formConfig = [
      {
        value: '',
        type: 'select',
        name: 'teaching',
        placeholder: 'Insegnamento',
        validators: Validators.required,
        options: []
      },
      {
        value: '',
        type: 'select',
        name: 'room',
        placeholder: 'Aula',
        validators: Validators.required,
        options: []
      },
      {
        value: '',
        type: 'date',
        name: 'date',
        placeholder: 'Data esame',
        validators: Validators.required
      },
      {
        value: '',
        type: 'time',
        name: 'time',
        placeholder: 'Ora inizio esame',
        validators: Validators.required
      }
    ];
    this.teaching.forEach( control => {
      this.formConfig[0].options.unshift(control.name+' - '+control.professorDTO.name+' '+control.professorDTO.surname);
    });
    this.rooms.forEach( control => {
      this.formConfig[1].options.unshift(control.name);
    });
  }

  openNewExamDialog(id: number) {
    const dialogConfig = this.configDialog("Inserisci nuovo esame");
    const dialogRef = this.dialog.open(FormDialogComponent,dialogConfig);
    dialogRef.afterClosed().subscribe( (res: any) => {
      if(res) {
        var newExam: Exam = {} as Exam;
        newExam.idTeaching = this.getIdByTeaching(res.get("teaching").value.split(" ",1));
        newExam.idRoom = this.getIdByRoom(res.get("room").value);
        newExam.date = res.get("date").value;
        newExam.time = res.get("time").value;
        console.log(newExam);
      }
    });
  }

  getIdByTeaching(name: string) {
    console.log(name);
    var teaching: Teaching = this.teaching.find(function(item) {
      return item.name == name;
    });
    return teaching.id;
  }

  getIdByRoom(name: string) {
    var room: Room = this.rooms.find(function(item) {
      return item.name == name;
    });
    return room.id;
  }
}
