import {Component, Inject, OnInit} from '@angular/core';
import {NewProfessorDialogComponent} from '../new-professor-dialog/new-professor-dialog.component';
import {FirebaseService} from '../../../services/firebase.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Student} from '../../../models/student';
import {StudentRestService} from '../../../services/student-rest.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {EMAIL_REGEX} from '../../../../Variable';
import {animate, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-new-student-dialog',
  animations: [
    trigger(
      'enterAnimation', [
        transition(':enter', [
          style({opacity: 0}),
          animate('1500ms', style({opacity: 1}))
        ]),
        transition(':leave', [
          style({transform: 'translateX(0)', opacity: 1}),
          animate('500ms', style({transform: 'translateX(100%)', opacity: 0}))
        ])
      ]
    )
  ],
  templateUrl: './new-student-dialog.component.html',
  styleUrls: ['./new-student-dialog.component.css']
})
export class NewStudentDialogComponent implements OnInit {

  public insertFormGroup: FormGroup;

  newStudent: Student = {} as Student;
  idCourse: number;
  uid: string;
  response: number = 2;


  constructor(private studentRestService: StudentRestService, private fireBaseService: FirebaseService, private fb: FormBuilder, private dialogRef: MatDialogRef<NewProfessorDialogComponent>, @Inject(MAT_DIALOG_DATA) data) {
    this.idCourse = data.id;
  }

  ngOnInit() {
    this._initInsertFormGroupBuilder();
  }

  close() {
    this.dialogRef.close();
  }

  save() {
    this.response = 0;
/*    console.log(this.newStudent);
    console.log(this.idCourse);
    this.fireBaseService.registerNewUser(this.newStudent.email, this.newStudent.password).then(res => {
      if (res) {
        this.newStudent.uid = res.user.uid;
        this.newStudent.userType = 1;
        this.newStudent.idCourse = this.idCourse;
        this.registerNewStudent(this.newStudent);
      }
    });*/
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
      this.insertFormGroup = this.fb.group({
      'name' : [null, Validators.required],
      'surname': false,
      'email' : [null, Validators.compose([Validators.required, Validators.pattern(EMAIL_REGEX)])],
      'password' : [null, Validators.compose([Validators.minLength(6), Validators.maxLength(25)])],
      'age' :false,
      'matricola' :false,
      'year' :false,
      'yearStart' :false
    })
  }
}
/*    */
