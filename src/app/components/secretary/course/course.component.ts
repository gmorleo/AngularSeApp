import {Component, Inject, NgZone, OnChanges, OnInit} from '@angular/core';
import {Course} from '../../../models/course';
import {CourseRestService} from '../../../services/course-rest.service';
import {MAT_DIALOG_DATA, MatDialog, MatDialogConfig, MatDialogRef, Sort} from '@angular/material';
import {NewCourseDialogComponent} from '../new-course-dialog/new-course-dialog.component';


@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit {

  courses: Course[] = [];
  headers: string[] = ['Id', 'Nome', 'Tipologia', 'Lunghezza', 'Crediti', 'Sede', 'Lingua'];

  defSort: Sort = {
    direction: 'asc',
    active: 'idCourse'
  }

  constructor(private courseRestService: CourseRestService, public dialog: MatDialog) {

  }

  ngOnInit() {
    this.getAllCourse();
  }

  getAllCourse() {
    this.courseRestService.getAll().subscribe( data => {
      this.courses = data;
      this.sortData(this.defSort);
    }, err => {
      console.log(err)
    })
  }

  openNewCourseDialog(): void {

    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    const dialogRef = this.dialog.open(NewCourseDialogComponent,dialogConfig);
    dialogRef.afterClosed().subscribe( res => {
      console.log(res);
      this.getAllCourse();
    })
  }

  sortData(sort: Sort) {
    const data = this.courses.slice();
    if (!sort.active || sort.direction === '') {
      this.courses = data;
      return;
    }

    this.courses = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'idCourse': console.log("here"); return compare(a.id, b.id, isAsc);
        case 'name': return compare(a.name, b.name, isAsc);
        case 'type': return compare(a.type, b.type, isAsc);
        case 'lenght': return compare(a.lenght, b.lenght, isAsc);
        case 'credits': return compare(a.credits, b.credits, isAsc);
        case 'location': return compare(a.location, b.location, isAsc);
        case 'language': return compare(a.language, b.language, isAsc);
        default: return 0;
      }
    });
  }

}

function compare(a, b, isAsc) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
