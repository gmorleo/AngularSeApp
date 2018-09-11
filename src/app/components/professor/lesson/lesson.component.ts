import { Component, OnInit } from '@angular/core';
import {LessonRestService} from '../../../services/lesson-rest.service';
import {Lesson} from '../../../models/lesson';
import {User} from '../../../models/user';
import {Professor} from '../../../models/professor';
import {Material} from '../../../models/material';
import {MaterialRestService} from '../../../services/material-rest.service';
import {MatDialog, MatDialogConfig} from '@angular/material';
import {FormDialogComponent} from '../../common/form-dialog/form-dialog.component';
import {AddMaterialDialogComponent} from '../add-material-dialog/add-material-dialog.component';

@Component({
  selector: 'app-lesson',
  templateUrl: './lesson.component.html',
  styleUrls: ['./lesson.component.css']
})
export class LessonComponent implements OnInit {

  professor: Professor = {} as Professor;
  lessons: Lesson[];
  materials: Material[] = [];
  lesson = 0;
  rating: number;

  constructor(private lessonRestService: LessonRestService,
              private materialRestService: MaterialRestService,
              private dialog: MatDialog) {
    this.professor = JSON.parse(localStorage.getItem('user'));
    console.log(this.professor.id);
  }

  ngOnInit() {
    this.getAllLessonById();
  }

  getAllLessonById() {
    this.lessonRestService.getAllById(this.professor.id).subscribe( data => {
      this.lessons = data;
    })
  }

  getMaterialByIdLesson(id: number) {
    this.materialRestService.getByIdLesson(id).subscribe( data => {
      this.materials = data;
      console.log(this.materials.length);
    })
  }


  openLesson(i: number, id: number) {
    this.lesson = i;
    this.getMaterialByIdLesson(id);
  }

  openNewMaterialDialog() {
    const dialogConfig = this.configDialog();
    const dialogRef = this.dialog.open(AddMaterialDialogComponent,dialogConfig);
    dialogRef.afterClosed().subscribe( res => {
      if(res) {
        console.log(res);
      }
    })
  }

  configDialog() {
    var dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    return dialogConfig;
  }
}
