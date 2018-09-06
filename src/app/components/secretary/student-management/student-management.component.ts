import { Component, OnInit } from '@angular/core';
import {Student} from '../../../models/student';
import {StudentRestService} from '../../../services/student-rest.service';
import {MatDialog, MatDialogConfig, Sort} from '@angular/material';
import {CourseRestService} from '../../../services/course-rest.service';
import {Course} from '../../../models/course';
import {FormDialogComponent} from '../../common/form-dialog/form-dialog.component';
import {Validators} from '@angular/forms';
import {EMAIL_REGEX} from '../../../../Variable';
import {FirebaseService} from '../../../services/firebase.service';
import {ResponseDialogComponent} from '../../common/response-dialog/response-dialog.component';
import {UtilityService} from '../../../services/utility.service';

@Component({
  selector: 'app-student-management',
  templateUrl: './student-management.component.html',
  styleUrls: ['./student-management.component.css']
})
export class StudentManagementComponent implements OnInit {

  newStudent: Student = {} as Student;
  students: Student[] = [];
  courses: Course[] = [];
  formConfig = [];
  headers: string[] = ['Id', 'Nome', 'Cognome', 'Email', 'Età', 'Matricola','Anno','Anno Inizio','Corso'];
  defSort: Sort = {
    direction: 'asc',
    active: 'idUser'
  }


  constructor(private utilityService: UtilityService, private firebaseService: FirebaseService, private studentRestService: StudentRestService, private courseRestService: CourseRestService, private dialog: MatDialog) {

  }

  ngOnInit() {
    this.getAllCourse();
    this.getAllStudent();
  }

  getAllStudent() {
    this.studentRestService.getAll().subscribe( data => {
      this.students = data;
      this.sortData(this.defSort);
    }, err => {
      console.log(err)
    })
  }

  getAllCourse() {
    this.courseRestService.getAll().subscribe( data => {
      this.courses = data.slice();
    }, err => {
      console.log(err)
    })
  }

  openNewStudentDialog(idCourse: number): void {
    const dialogConfig = this.initForm();
    const dialogRef = this.dialog.open(FormDialogComponent,dialogConfig);
    dialogRef.afterClosed().subscribe( (res: any) => {
      if (res) {
        this.resolveRes(res,idCourse);
        this.firebaseService.registerNewUser(this.newStudent.email, this.newStudent.password).then(res => {
          if (res) {
            this.newStudent.uid = res.user.uid;
            this.insertNewStudent(this.newStudent);
          }
        });
      }
    });
  }

  insertNewStudent(student: Student) {
    this.studentRestService.insertNewStudent(student).subscribe(res => {
      if (res.name == student.name) {
        this.openResponseForm("Studente inserito correttamente!",0)
        this.getAllStudent();
      }
    }, err => {
      console.log(err)
    });
  }

  openResponseForm(t: string, r: number) {
    const responseConfig = new MatDialogConfig();
    responseConfig.disableClose = true;
    responseConfig.autoFocus = true;
    responseConfig.data = {
      title: t,
      response: r
    }
    const responseDialog = this.dialog.open(ResponseDialogComponent, responseConfig)
  }

  resolveRes(element: any, idCourse: number) {
    this.newStudent.email = element.get("email").value;
    this.newStudent.password = element.get("password").value;
    this.newStudent.name = element.get("name").value;
    this.newStudent.surname = element.get("surname").value;
    this.newStudent.age = element.get("age").value;
    this.newStudent.matricola = element.get("matricola").value;
    this.newStudent.year = element.get("year").value;
    this.newStudent.yearStart = element.get("yearStart").value;
    this.newStudent.userType = 1;
    this.newStudent.idCourse = idCourse;
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
        value: '',
        type: 'text',
        name: 'surname',
        placeholder: 'Cognome',
        validators: Validators.required
      },
      {
        type: 'text',
        name: 'email',
        placeholder: 'Email',
        validators:  Validators.compose([Validators.pattern(EMAIL_REGEX), Validators.required])
      },
      {
        type: 'password',
        name: 'password',
        placeholder: 'Password',
        validators:  Validators.compose([Validators.minLength(6), Validators.maxLength(25), Validators.required])
      },
      {
        type: 'number',
        name: 'age',
        placeholder: 'Età',
        validators: Validators.required
      },
      {
        type: 'number',
        name: 'matricola',
        placeholder: 'Matricola',
        validators: Validators.compose([Validators.minLength(8), Validators.maxLength(8), Validators.required])
      },
      {
        type: 'number',
        name: 'year',
        placeholder: 'Anno di corso',
        validators: Validators.required
      },
      {
        type: 'number',
        name: 'yearStart',
        placeholder: 'Anno di inizio',
        validators: Validators.required
      },
    ];

    var dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      title: 'Inserisci nuovo studente',
      element: this.formConfig,
    };
    return dialogConfig;
  }

  sortData(sort: Sort) {
    this.students = this.utilityService.sortItem(sort, this.students);
  }

}
