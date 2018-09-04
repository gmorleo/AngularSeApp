import {Component, Inject, OnInit} from '@angular/core';
import {NewProfessorDialogComponent} from '../new-professor-dialog/new-professor-dialog.component';
import {FirebaseService} from '../../../services/firebase.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Student} from '../../../models/student';
import {StudentRestService} from '../../../services/student-rest.service';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {EMAIL_REGEX} from '../../../../Variable';
import {animate, style, transition, trigger} from '@angular/animations';
import {User} from '../../../models/user';

export interface Conf {
  name: string;
  placehodler: string;
  type: string
}

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

  headers: string[] = ['Nome','Cognome', 'Email', 'Password'];
  valueName: string[] = ['name','surname','email','password'];
  valueType: string[] = ['text', 'text', 'text', 'password'];

  c: Conf;

  config = [
    {
      type: 'text',
      name: 'name',
      placeholder: 'Nome',
    },
    {
      type: 'text',
      name: 'surname',
      placeholder: 'Cognome',
    },
    {
      type: 'text',
      name: 'email',
      placeholder: 'Email',
    },
    {
      type: 'password',
      name: 'password',
      placeholder: 'Password',
    }
  ];

  valueLenght: number[];
  newStudent: Student = {} as Student;
  idCourse: number;
  uid: string;
  response: number = 2;
  user: User;

  constructor(private studentRestService: StudentRestService, private fireBaseService: FirebaseService, private fb: FormBuilder, private dialogRef: MatDialogRef<NewProfessorDialogComponent>, @Inject(MAT_DIALOG_DATA) data) {
    this.idCourse = data.id;
    console.log(this.headers.length)
    this.valueLenght = range(this.headers.length);
    console.log(this.valueLenght);
  }

  ngOnInit() {
    /*this._initInsertFormGroupBuilder();*/
    this.insertFormGroup = this.createGroup();
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

/*  private _initInsertFormGroupBuilder() {
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
  }*/

  private _initInsertFormGroupBuilder() {
/*    this.insertFormGroup = this.fb.group({
    });
    this.insertFormGroup.addControl(this.valueName[0], new FormControl('', Validators.required));
    this.insertFormGroup.addControl(this.valueName[1], new FormControl('', Validators.required));
    this.insertFormGroup.addControl(this.valueName[2], new FormControl('', Validators.pattern(EMAIL_REGEX)));
    this.insertFormGroup.addControl(this.valueName[3], new FormControl('', Validators.compose([Validators.minLength(6), Validators.maxLength(25)])));*/

    this.insertFormGroup = this.fb.group({
      'name' : [null, Validators.required],
      'surname': false,
      'email' : [null, Validators.compose([Validators.required, Validators.pattern(EMAIL_REGEX)])],
      'password' : [null, Validators.compose([Validators.minLength(6), Validators.maxLength(25)])],
      'age' :false,
      'matricola' :false,
      'year' :false,
      'yearStart' :false
    });
  }

  createItem(prop): FormGroup {
    return this.fb.group({
      'name':false
    });

  }

  createGroup() {
    const group = this.fb.group({});
    this.config.forEach(control => group.addControl(control.name, this.fb.control(null)));
    return group;
  }


}

function range(lenght: number) {
  var r = [];
  var i: number;
  for (i = 0; i < lenght; i++) {
    r[i] = i;
  }
  return r;
}
