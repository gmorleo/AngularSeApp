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
import {ReviewRestService} from '../../../services/review-rest.service';
import {Review} from '../../../models/review';
import {animate, style, transition, trigger} from '@angular/animations';

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
  rating: number = 0;
  ratingMaterial: number[] = [];

  constructor(private lessonRestService: LessonRestService,
              private materialRestService: MaterialRestService,
              private dialog: MatDialog,
              private reviewRestService: ReviewRestService) {
    this.professor = JSON.parse(localStorage.getItem('user'));
    console.log(this.professor.id);
    this.rating = 5;
  }

  ngOnInit() {
    this.getAllLessonById();
  }


  openLesson(i: number, id: number) {
    this.lesson = i;
    this.getMaterialByIdLesson(id);
    this.getAllReviewBylessonId(id);
  }

  getAllReviewBylessonId(idLesson: number){
    this.reviewRestService.getByIdLesson(idLesson).subscribe( data => {
      var reviews: Review[] = data;
      var rating = 0;
      var n = reviews.length;
      reviews.forEach( (control) =>{
        rating = rating + control.rate
      })
      this.rating = rating/n;
    })
  }

  getAllReviewByMaterialId(idMaterial: number, i: number){
    this.reviewRestService.getByIdMaterial(idMaterial).subscribe( data => {
      console.log(idMaterial);
      console.log(data);
      var reviews: Review[] = data;
      var rating = 0;
      var n = reviews.length;
      reviews.forEach( (control) =>{
        rating = rating + control.rate
      })
      this.ratingMaterial[i] = rating/n;
    })
  }

  getAllLessonById() {
    this.lessonRestService.getAllById(this.professor.id).subscribe( data => {
      this.lessons = data;
    })
  }

  getMaterialByIdLesson(id: number) {
    this.materialRestService.getByIdLesson(id).subscribe( data => {
      this.materials = data;
      console.log(this.materials);
      this.materials.forEach( (control, index) => {
        this.getAllReviewByMaterialId(control.id,index);
        console.log(index);
      })
    })
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
