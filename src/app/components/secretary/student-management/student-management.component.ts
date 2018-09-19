import { Component, OnInit } from '@angular/core';
import {Student} from '../../../models/student';
import {StudentRestService} from '../../../services/student-rest.service';
import {MatDialog} from '@angular/material';
import {CourseRestService} from '../../../services/course-rest.service';
import {Course} from '../../../models/course';
import {FormDialogComponent} from '../../common/form-dialog/form-dialog.component';
import {Validators} from '@angular/forms';
import {EMAIL_REGEX, FAIL, NAME, SUCCESS} from '../../../../Variable';
import {FirebaseService} from '../../../services/firebase.service';
import {ResponseDialogComponent} from '../../common/response-dialog/response-dialog.component';
import {UtilityService} from '../../../services/utility.service';
import {DialogBuilder} from '../../../models/dialog-builder';

@Component({
  selector: 'app-student-management',
  templateUrl: './student-management.component.html',
  styleUrls: ['./student-management.component.css']
})
export class StudentManagementComponent implements OnInit {

  students: Student[] = [];
  courses: Course[] = [];

  constructor(private utilityService: UtilityService,
              private firebaseService: FirebaseService,
              private studentRestService: StudentRestService,
              private courseRestService: CourseRestService,
              private dialog: MatDialog) {
    this.reload();
  }

  openNewStudentDialog(idCourse: number): void {
    const dialogRef = this.dialog.open(FormDialogComponent,this.configInsertDialog());
    dialogRef.afterClosed().subscribe( (newInsertion: Student) => {
      if (newInsertion){
        newInsertion.userType = 1;
        this.firebaseService.registerNewUser(newInsertion.email,newInsertion.password).then( res => {
          if(res) {
            newInsertion.uid = res.user.uid;
            newInsertion.idCourse = idCourse;
            this.studentRestService.insert(newInsertion).subscribe( res => {
              this.openResponseDialog("Studente", SUCCESS);
              this.reload();
            }, err => {
              this.openResponseDialog("Studente", FAIL);
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
    dialogBuilder.addInput("number",'','matricola','Matricola',Validators.required);
    dialogBuilder.addInput("number",'','year','Anno di corso',Validators.required);
    dialogBuilder.addInput("number",'','yearStart','Anno di inizio',Validators.required);
    return dialogBuilder.getConfigInsertDialog();
  }

  reload(){
    this.getAllCourse();
    this.getAllStudent();
  }

  getAllStudent() {
    this.studentRestService.getAll().subscribe( data => {
      this.students = data;
    })
  }

  getAllCourse() {
    this.courseRestService.getAll().subscribe( data => {
      this.courses = data;
    })
  }

  ngOnInit() {
  }

}
