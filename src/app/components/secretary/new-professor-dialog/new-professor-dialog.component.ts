import { Component, OnInit } from '@angular/core';
import {Professor} from '../../../models/professor';
import {ProfessorRestService} from '../../../services/professor-rest.service';
import {MatDialogRef} from '@angular/material';
import {FirebaseService} from '../../../services/firebase.service';
import UserCredential = firebase.auth.UserCredential;
import {CourseRestService} from '../../../services/course-rest.service';
import {Course} from '../../../models/course';

@Component({
  selector: 'app-new-professor-dialog',
  templateUrl: './new-professor-dialog.component.html',
  styleUrls: ['./new-professor-dialog.component.css']
})
export class NewProfessorDialogComponent implements OnInit {

  newProfessor: Professor = {} as Professor;
  courses: Course[] = [];
  idCourse: number;
  uid: string;
  asd: UserCredential;

  constructor(private professorRestService: ProfessorRestService, private dialogRef: MatDialogRef<NewProfessorDialogComponent>, private fireBaseService: FirebaseService, private courseRestService: CourseRestService) { }

  ngOnInit() {
    this.getAllCourse();
  }

  close() {
    this.dialogRef.close();
  }

  save() {
    console.log(this.newProfessor);
    console.log(this.idCourse);
    this.fireBaseService.registerNewUser(this.newProfessor.email,this.newProfessor.password).then( res => {
      if(res) {
        this.newProfessor.uid = res.user.uid;
        this.newProfessor.userType = 3;
        this.newProfessor.course = this.idCourse;
        console.log(this.newProfessor);
        this.registerNewProfessor(this.newProfessor);
      }
    });
  }

  registerNewProfessor(professor: Professor) {
    this.professorRestService.insertNewProfessor(professor).subscribe( res => {
      console.log(res);
      this.dialogRef.close(res);
    }, err => {
      console.log(err)
    });
  }

  getAllCourse() {
    this.courseRestService.getAll().subscribe( data => {
      this.courses = data;
    }, err => {
      console.log(err)
    })
  }
}
