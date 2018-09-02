import {Component, Inject, OnInit} from '@angular/core';
import {Professor} from '../../../models/professor';
import {NewProfessorDialogComponent} from '../new-professor-dialog/new-professor-dialog.component';
import {FirebaseService} from '../../../services/firebase.service';
import {Course} from '../../../models/course';
import {CourseRestService} from '../../../services/course-rest.service';
import {ProfessorRestService} from '../../../services/professor-rest.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Student} from '../../../models/student';
import {StudentRestService} from '../../../services/student-rest.service';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {EMAIL_REGEX} from '../../../../Variable';

@Component({
  selector: 'app-new-student-dialog',
  templateUrl: './new-student-dialog.component.html',
  styleUrls: ['./new-student-dialog.component.css']
})
export class NewStudentDialogComponent implements OnInit {

  //Controlli validità campi
  public insertFormGroup: FormGroup;
  emailFormControl: AbstractControl;
  passwordFormControl: AbstractControl;

  newStudent: Student = {} as Student;
  idCourse: number;
  uid: string;
  response: number = 2;


  constructor(private studentRestService: StudentRestService, private fireBaseService: FirebaseService, private dialogRef: MatDialogRef<NewProfessorDialogComponent>, @Inject(MAT_DIALOG_DATA) data) {
    this.idCourse = data.id;
    console.log(this.idCourse);
  }

  ngOnInit() {
    this._initInsertFormGroupBuilder();
  }

  close() {
    this.dialogRef.close();
  }

  save() {
    console.log(this.newStudent);
    console.log(this.idCourse);
    this.fireBaseService.registerNewUser(this.newStudent.email, this.newStudent.password).then(res => {
      if (res) {
        this.newStudent.uid = res.user.uid;
        this.newStudent.userType = 1;
        this.newStudent.idCourse = this.idCourse;
        this.registerNewStudent(this.newStudent);
      }
    });
  }

  registerNewStudent(student: Student) {
    this.studentRestService.insertNewStudent(student).subscribe(res => {
      console.log(res);
      console.log(student);
      if (res.name == student.name) {
        this.response = 0;
      } else {
        this.response = 1;
      }
    }, err => {
      console.log(err)
    });
  }

  private _initInsertFormGroupBuilder() {
    this.insertFormGroup = new FormGroup({
      name: new FormControl(''),
      surname: new FormControl(''),
/*      email: new FormControl('emailControl', [Validators.required, Validators.pattern(EMAIL_REGEX)]),
      password: new FormControl('',[Validators.required, Validators.minLength(6), Validators.maxLength(25)])*/
      age: new FormControl(''),
      matricola: new FormControl(''),
      year: new FormControl(''),
      yearStart: new FormControl(''),
    });

    this.insertFormGroup.registerControl('email', this.emailFormControl = new FormControl('',
      [
        Validators.required,
        Validators.pattern(EMAIL_REGEX)
      ]));
    this.insertFormGroup.registerControl('password', this.passwordFormControl = new FormControl('',
      [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(25),
      ]));
  }
}
/*    */
