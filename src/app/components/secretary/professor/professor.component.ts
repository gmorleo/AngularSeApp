import { Component, OnInit } from '@angular/core';
import {ProfessorRestService} from '../../../services/professor-rest.service';
import {Professor} from '../../../models/professor';
import {MatDialog, MatDialogConfig, Sort} from '@angular/material';
import {Validators} from '@angular/forms';
import {EMAIL_REGEX} from '../../../../Variable';
import {CourseRestService} from '../../../services/course-rest.service';
import {Course} from '../../../models/course';
import {FormDialogComponent} from '../../common/form-dialog/form-dialog.component';
import {FirebaseService} from '../../../services/firebase.service';
import {ResponseDialogComponent} from '../../common/response-dialog/response-dialog.component';
import {UtilityService} from '../../../services/utility.service';

@Component({
  selector: 'app-professor',
  templateUrl: './professor.component.html',
  styleUrls: ['./professor.component.css']
})
export class ProfessorComponent implements OnInit {

  professors: Professor[] = [];
  courses: Course[] = [];
  selectedCourse: Course;
  newProfessor: Professor = {} as Professor;
  headers: string[] = ['Id', 'Nome', 'Cognome', 'Email', 'Età'];

  formConfig = [];

  defSort: Sort = {
    direction: 'asc',
    active: 'idUser'
  }

  constructor(private utilityService: UtilityService,
              private firebaseService: FirebaseService,
              private professorRestService: ProfessorRestService,
              private courseRestService: CourseRestService,
              public dialog: MatDialog) { }

  ngOnInit() {
    this.getAllProfessor();
    this.getAllCourse();
  }

  getAllProfessor() {
    this.professorRestService.getAll().subscribe( data => {
      this.professors = data.slice();
      this.sortData(this.defSort);
    }, err => {
      console.log(err)
    })
  }

  getAllCourse() {
    this.courseRestService.getAll().subscribe( data => {
      this.courses = data;
      this.initForm();
    }, err => {
      console.log(err)
    })
  }

  openNewProfessorDialog(): void {
    const dialogConfig = this.initForm();
    const dialogRef = this.dialog.open(FormDialogComponent,dialogConfig);
    dialogRef.afterClosed().subscribe( (res: any) => {
      if (res){
        this.resolveRes(res);
        console.log(this.newProfessor)
        this.firebaseService.registerNewUser(this.newProfessor.email,this.newProfessor.password).then( res => {
          if (res) {
            this.newProfessor.uid = res.user.uid;
            this.insertNewProfessor(this.newProfessor);
          }
        })
      }
    })
  }

  insertNewProfessor(professor: Professor) {
    this.professorRestService.insert(professor).subscribe(res => {
      if (res.name == professor.name) {
        this.openResponseDialog("Professore inserito correttamente!",0)
        this.getAllProfessor();
      }
    }, err => {
      console.log(err)
    });
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

  resolveRes(element: any) {
    this.newProfessor.email = element.get("email").value;
    this.newProfessor.password = element.get("password").value;
    this.newProfessor.name = element.get("name").value;
    this.newProfessor.surname = element.get("surname").value;
    this.newProfessor.age = element.get("age").value;
    this.selectedCourse = this.courses.find(function(item) {
      return item.name == element.get("course").value;
    });
    this.newProfessor.course = this.selectedCourse.id;
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
        type: 'select',
        name: 'course',
        placeholder: 'Corso di Studi',
        validators: Validators.required,
        options: []
      }
    ];
    this.courses.forEach( control => {
      this.formConfig[5].options.unshift(control.name);
    })

    var dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      title: 'Inserisci nuovo professore',
      element: this.formConfig,
    };
    return dialogConfig;
  }

  sortData(sort: Sort) {
    this.professors = this.utilityService.sortItem(sort, this.professors);
  }

}
