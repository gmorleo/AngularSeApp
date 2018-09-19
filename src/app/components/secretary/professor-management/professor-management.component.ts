import { Component, OnInit } from '@angular/core';
import {Professor} from '../../../models/professor';
import {ProfessorRestService} from '../../../services/professor-rest.service';
import {Validators} from '@angular/forms';
import {DialogBuilder} from '../../../models/dialog-builder';
import {EMAIL_REGEX, FAIL, NAME, SUCCESS} from '../../../../Variable';
import {CourseRestService} from '../../../services/course-rest.service';
import {Course} from '../../../models/course';
import {ResponseDialogComponent} from '../../common/response-dialog/response-dialog.component';
import {MatDialog} from '@angular/material';
import {FormDialogComponent} from '../../common/form-dialog/form-dialog.component';
import {FirebaseService} from '../../../services/firebase.service';

@Component({
  selector: 'app-professor-management',
  templateUrl: './professor-management.component.html',
  styleUrls: ['./professor-management.component.css']
})
export class ProfessorManagementComponent implements OnInit {

  professors: Professor[];
  courses: Course[];
  showSpinner: boolean;

  constructor(private professorRestService: ProfessorRestService,
              private courseRestService: CourseRestService,
              private firebaseService: FirebaseService,
              private dialog: MatDialog) {
    this.showSpinner = true;
    this.reload();
  }

  openNewProfessorDialog(){
    const dialogRef = this.dialog.open(FormDialogComponent,this.configInsertDialog());
    dialogRef.afterClosed().subscribe( (professor: Professor) => {
      if (professor){
        var newProfessor = professor;
        newProfessor.userType = 3;
        this.firebaseService.registerNewUser(newProfessor.email,newProfessor.password).then( user => {
          if(user) {
            newProfessor.uid = user.user.uid;
            this.professorRestService.insert(newProfessor).subscribe( res => {
              this.openResponseDialog("Professore", SUCCESS);
              this.reload();
            }, err => {
              this.openResponseDialog("Professore", FAIL);
            });
          }
        })
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
    dialogBuilder.addTitle("Inserisci nuovo professore");
    dialogBuilder.addInput("text",'','name','Nome',Validators.required);
    dialogBuilder.addInput("text",'','surname','Cognome',Validators.required);
    dialogBuilder.addInput("email",'','email','Email',Validators.compose([Validators.pattern(EMAIL_REGEX), Validators.required]));
    dialogBuilder.addInput("password",'','password','Password',Validators.compose([Validators.minLength(6), Validators.maxLength(25), Validators.required]));
    dialogBuilder.addInput("number",'','age','Età',Validators.required);
    dialogBuilder.addSelect( '', 'course','Corso di studi', Validators.required, this.courses, NAME);
    return dialogBuilder.getConfigInsertDialog();
  }

  reload(){
    this.getAllProfessor();
    this.getAllCourse();
  }

  getAllProfessor() {
    this.professorRestService.getAll().subscribe( professors => {
      this.professors = professors;
      this.showSpinner = false;
    })
  }

  getAllCourse(){
    this.courseRestService.getAll().subscribe( courses => {
      this.courses = courses;
    })
  }

  ngOnInit() {
  }

}
