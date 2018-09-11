import { Component, OnInit } from '@angular/core';
import {Teaching} from '../../../models/teaching';
import {MatDialog, MatDialogConfig, Sort} from '@angular/material';
import {Course} from '../../../models/course';
import {CourseRestService} from '../../../services/course-rest.service';
import {TeachingRestService} from '../../../services/teaching-rest.service';
import {UtilityService} from '../../../services/utility.service';
import {EMAIL_REGEX, FAIL, NAME, NAME_SURNAME, SUCCESS} from '../../../../Variable';
import {Validators} from '@angular/forms';
import {Professor} from '../../../models/professor';
import {ProfessorRestService} from '../../../services/professor-rest.service';
import {ResponseDialogComponent} from '../../common/response-dialog/response-dialog.component';
import {FormDialogComponent} from '../../common/form-dialog/form-dialog.component';
import {DialogBuilder} from '../../../models/dialog-builder';

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
              public dialog: MatDialog) {
    this.reload();
  }

  openNewTeachingDialog(idCourse: number) {
    const dialogRef = this.dialog.open(FormDialogComponent,this.configInsertDialog());
    dialogRef.afterClosed().subscribe( (newInsertion: Teaching) => {
      if (newInsertion){
        newInsertion.idCourse = idCourse;
        console.log(newInsertion);
        this.teachingRestService.insert(newInsertion).subscribe( res => {
          this.openResponseDialog("Insegnamento", SUCCESS);
          this.reload();
        }, err => {
          this.openResponseDialog("Insegnamento", FAIL);
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
    dialogBuilder.addInput("text",'','name',"Nome dell'insegnamento",Validators.required);
    dialogBuilder.addInput("number",'','credits','Crediti',Validators.required);
    dialogBuilder.addInput("number",'','year','Anno',Validators.required);
    dialogBuilder.addSelect('','idCourse','Corso di studi', Validators.required, this.courses, NAME);
    dialogBuilder.addSelect('','idProfessor','Professore', Validators.required, this.professors, NAME_SURNAME);
    return dialogBuilder.getConfigInsertDialog();
  }

  reload(){
    this.getAllProfessor();
    this.getAllTeaching();
    this.getAllCourse();
  }

  getAllTeaching() {
    this.teachingRestService.getAll().subscribe( data => {
      this.teaching = data;
    })
  }

  getAllCourse() {
    this.courseRestService.getAll().subscribe( data => {
      this.courses = data;
    })
  }

  getAllProfessor() {
    this.professorRestService.getAll().subscribe( data => {
      this.professors = data;
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

  ngOnInit() {
  }

}
