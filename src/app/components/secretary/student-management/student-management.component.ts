import { Component, OnInit } from '@angular/core';
import {Student} from '../../../models/student';
import {StudentRestService} from '../../../services/student-rest.service';
import {MatDialog, MatDialogConfig, Sort} from '@angular/material';
import {CourseRestService} from '../../../services/course-rest.service';
import {Course} from '../../../models/course';
import {NewProfessorDialogComponent} from '../new-professor-dialog/new-professor-dialog.component';
import {NewStudentDialogComponent} from '../new-student-dialog/new-student-dialog.component';
import {FormDialogComponent} from '../../common/form-dialog/form-dialog.component';

@Component({
  selector: 'app-student-management',
  templateUrl: './student-management.component.html',
  styleUrls: ['./student-management.component.css']
})
export class StudentManagementComponent implements OnInit {

  students: Student[] = [];
  courses: Course[] = [];
  headers: string[] = ['Id', 'Nome', 'Cognome', 'Email', 'Età', 'Matricola','Anno','Anno Inizio','Corso'];

  constructor(private studentRestService: StudentRestService, private courseRestService: CourseRestService, private dialog: MatDialog) {

  }

  ngOnInit() {
    this.getAllCourse();
    this.getAllStudent();
  }

  getAllStudent() {
    this.studentRestService.getAll().subscribe( data => {
      this.students = data;
/*      this.sortData(this.defSort);*/
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

    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      id: idCourse,
      title: 'Inserisci nuovo studente',
    };
    const dialogRef = this.dialog.open(FormDialogComponent,dialogConfig);
    dialogRef.afterClosed().subscribe( res => {
      console.log(res);
      this.getAllStudent();
    })
  }

  sortData(sort: Sort) {
    const data = this.students.slice();
    if (!sort.active || sort.direction === '') {
      this.students = data;
      return;
    }

    this.students = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'name': return compare(a.name, b.name, isAsc);
        case 'surname': return compare(a.surname, b.surname, isAsc);
        case 'email': return compare(a.email, b.email, isAsc);
        case 'age': return compare(a.age, b.age, isAsc);
        case 'idUser': return compare(a.idUser, b.idUser, isAsc);
        default: return 0;
      }
    });
  }

}

function compare(a, b, isAsc) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
