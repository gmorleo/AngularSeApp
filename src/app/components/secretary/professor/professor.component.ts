import { Component, OnInit } from '@angular/core';
import {ProfessorRestService} from '../../../services/professor-rest.service';
import {Professor} from '../../../models/professor';
import {MatDialog, MatDialogConfig, Sort} from '@angular/material';
import {NewProfessorDialogComponent} from '../new-professor-dialog/new-professor-dialog.component';

@Component({
  selector: 'app-professor',
  templateUrl: './professor.component.html',
  styleUrls: ['./professor.component.css']
})
export class ProfessorComponent implements OnInit {

  professors: Professor[] = [];
  headers: string[] = ['Id', 'Nome', 'Cognome', 'Email', 'Età'];

  constructor(private professorRestService: ProfessorRestService, public dialog: MatDialog) { }

  ngOnInit() {
    this.getAllProfessor();
  }

  getAllProfessor() {
    this.professorRestService.getAll().subscribe( data => {
      this.professors = data.slice();
    }, err => {
      console.log(err)
    })
  }

  openNewProfessorDialog(): void {

    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    const dialogRef = this.dialog.open(NewProfessorDialogComponent,dialogConfig);
    dialogRef.afterClosed().subscribe( res => {
      console.log(res);
      this.getAllProfessor();
    })
  }

  sortData(sort: Sort) {
    console.log(sort);
    const data = this.professors.slice();
    if (!sort.active || sort.direction === '') {
      this.professors = data;
      return;
    }

    this.professors = data.sort((a, b) => {
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
