import { Component, OnInit } from '@angular/core';
import {Professor} from '../../../models/professor';
import {ProfessorRestService} from '../../../services/professor-rest.service';
import {MatDialogRef} from '@angular/material';
import {FirebaseService} from '../../../services/firebase.service';
import UserCredential = firebase.auth.UserCredential;

@Component({
  selector: 'app-new-professor-dialog',
  templateUrl: './new-professor-dialog.component.html',
  styleUrls: ['./new-professor-dialog.component.css']
})
export class NewProfessorDialogComponent implements OnInit {

  newProfessor: Professor = {} as Professor;
  uid: string;
  asd: UserCredential;

  constructor(private professorRestService: ProfessorRestService, private dialogRef: MatDialogRef<NewProfessorDialogComponent>, private fireBaseService: FirebaseService) { }

  ngOnInit() {
  }

  close() {
    this.dialogRef.close();
  }

  save() {
    console.log(this.newProfessor);
    this.fireBaseService.registerNewUser(this.newProfessor.email,this.newProfessor.password).then( res => {
      if(res) {
        this.newProfessor.uid = res.user.uid;
        this.newProfessor.userType = 3;
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
}
