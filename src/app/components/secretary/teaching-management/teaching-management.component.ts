import { Component, OnInit } from '@angular/core';
import {Teaching} from '../../../models/teaching';
import {MatDialog, MatDialogConfig, Sort} from '@angular/material';
import {Course} from '../../../models/course';
import {CourseRestService} from '../../../services/course-rest.service';
import {TeachingRestService} from '../../../services/teaching-rest.service';
import {UtilityService} from '../../../services/utility.service';
import {EMAIL_REGEX} from '../../../../Variable';
import {Validators} from '@angular/forms';
import {Professor} from '../../../models/professor';
import {ProfessorRestService} from '../../../services/professor-rest.service';
import {ResponseDialogComponent} from '../../common/response-dialog/response-dialog.component';
import {FormDialogComponent} from '../../common/form-dialog/form-dialog.component';

@Component({
  selector: 'app-teaching-management',
  templateUrl: './teaching-management.component.html',
  styleUrls: ['./teaching-management.component.css']
})
export class TeachingManagementComponent implements OnInit {

  newTeaching: Teaching = {} as Teaching;
  teaching: Teaching[];
  courses: Course[];
  professors: Professor[];
  formConfig = [];
  headers: string[] = ['Id', 'Nome', 'Crediti', 'Anno', 'Professore'];
  defSort: Sort = {
    direction: 'asc',
    active: 'idUser'
  }

  constructor(private utilityService: UtilityService,
              private professorRestService: ProfessorRestService,
              private courseRestService: CourseRestService,
              private teachingRestService: TeachingRestService,
              public dialog: MatDialog) { }

  ngOnInit() {
    this.getAllCourse();
    this.getAllTeaching();
    this.getAllProfessor();
  }

  openNewTeachingDialog(idCourse: number) {
    const dialogConfig = this.initForm();
    const dialogRef = this.dialog.open(FormDialogComponent,dialogConfig);
    dialogRef.afterClosed().subscribe( (res: any) => {
      if (res){
        this.resolveRes(res, idCourse);
        console.log(this.newTeaching);
        this.insertNewTeaching(this.newTeaching);
      }
    })
  }

  insertNewTeaching(teaching: Teaching) {
    this.teachingRestService.insertNewTeaching(teaching).subscribe(res => {
      if (res.name == teaching.name) {
        this.openResponseDialog("Professore inserito correttamente!",0)
        this.getAllTeaching();
      }
    }, err => {
      console.log(err)
    });
  }

  resolveRes(element: any, idCourse: number) {
    this.newTeaching.name = element.get("name").value;
    this.newTeaching.credits = element.get("credits").value;
    this.newTeaching.year = element.get("year").value;
    this.newTeaching.idCourse = idCourse;
    var selectedProfessor = this.professors.find(function(item) {
      return item.name == element.get("professor").value;
    });
    this.newTeaching.idProfessor = selectedProfessor.id;
  }

  openResponseDialog(t: string, r: number) {
    const responseConfig = new MatDialogConfig();
    responseConfig.disableClose = true;
    responseConfig.autoFocus = true;
    responseConfig.data = {
      title: t,
      response: r
    }
    const responseDialog = this.dialog.open(ResponseDialogComponent, responseConfig)
  }

  getAllTeaching() {
    this.teachingRestService.getAll().subscribe( data => {
      this.teaching = data;
    }, err => {
      console.log(err)
    })
  }

  getAllCourse() {
    this.courseRestService.getAll().subscribe( data => {
      this.courses = data;
    }, err => {
      console.log(err)
    })
  }

  getAllProfessor() {
    this.professorRestService.getAll().subscribe( data => {
      this.professors = data;
    }, err => {
      console.log(err)
    })
  }

  initForm() {
    this.formConfig = [
      {
        type: 'text',
        name: 'name',
        placeholder: 'Nome',
        validators: Validators.required
      },
      {
        type: 'number',
        name: 'credits',
        placeholder: 'Crediti',
        validators: Validators.required
      },
      {
        type: 'number',
        name: 'year',
        placeholder: 'Anno',
        validators:  Validators.required
      },
      {
        type: 'select',
        name: 'professor',
        placeholder: 'Professore',
        validators: Validators.required,
        options: []
      }
    ];

    this.professors.forEach( control => {
      this.formConfig[3].options.unshift(control.name + " " + control.surname);
    })

    var dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      title: 'Inserisci nuovo insegnamento',
      element: this.formConfig,
    };
    return dialogConfig;
  }

  sortData(sort: Sort) {
    this.teaching = this.utilityService.sortItem(sort, this.teaching);
  }


}
