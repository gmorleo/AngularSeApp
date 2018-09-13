import { Component, OnInit} from '@angular/core';
import {LessonRestService} from '../../../services/lesson-rest.service';
import {Lesson} from '../../../models/lesson';
import {Course} from '../../../models/course';
import {CourseRestService} from '../../../services/course-rest.service';
import {DateAdapter, MatCalendar, MatDatepicker, MatDialog, MatDialogConfig} from '@angular/material';
import {Validators} from '@angular/forms';
import {Teaching} from '../../../models/teaching';
import {TeachingRestService} from '../../../services/teaching-rest.service';
import {Room} from '../../../models/room';
import {RoomRestService} from '../../../services/room-rest.service';
import {FormDialogComponent} from '../../common/form-dialog/form-dialog.component';
import {DialogBuilder} from '../../../models/dialog-builder';
import {FAIL, NAME, SUCCESS, TIME} from '../../../../Variable';
import {ResponseDialogComponent} from '../../common/response-dialog/response-dialog.component';
import {Observable} from 'rxjs';
import {Notification} from '../../../models/notification';
import {NotificationRestService} from '../../../services/notification-rest.service';


export interface Tile {
  start: string;
  end: string;
  lesson: Lesson;
  color: string;
  cols: number;
  rows: number;
  text: string;
}

const MONTH = ['Gennaio', 'Febbraio', 'Marzo', 'Aprile', 'Maggio', 'Giugno', 'Luglio', 'Agosto', 'Settembre',
  'Ottobre', 'Novembre', 'Dicembre'];

const DAY = ['Lunedì', 'Martedì', 'Mercoledì', 'Giovedì', 'Venerdì', 'Sabato', 'Domenica'];
const TIME_SET = ['08:30','09:30','10:30','11:30','12:30','13:30','15:00','16:00','17:00','18:00'];

@Component({
  selector: 'app-lesson-management',
  templateUrl: './lesson-management.component.html',
  styleUrls: ['./lesson-management.component.css']
})
export class LessonManagementComponent implements OnInit{

  lessons: Lesson[];
  courses: Course[];
  teaching: Teaching[];
  rooms: Room[];
  selectedCourse: number;
  selectedDate: Date;
  displayDate: string;

  tiles: Tile[] = [];

  constructor(public dialog: MatDialog,
              private roomRestService: RoomRestService,
              private teachingRestService: TeachingRestService,
              private lessonRestService: LessonRestService,
              private courseRestService: CourseRestService,
              private notificationRestService: NotificationRestService,
              private dateAdapter: DateAdapter<Date>) {
    this.dateAdapter.setLocale('it');
    this.selectedDate = this.dateAdapter.today();
    this.reload();
  }

  openLessonDialog(tile: Tile){
    if (tile.lesson){
      this.openModifyDialog(tile);
    } else {
      this.openInsertDialog(tile);
    }
  }


  private openModifyDialog(tile: Tile) {
    const dialogRef = this.dialog.open(FormDialogComponent, this.configModifyDialog(tile.start, tile.end, tile.lesson));
    dialogRef.afterClosed().subscribe( (modifyInsertion: Lesson) => {
      if(modifyInsertion) {
        modifyInsertion.end = tile.end;
        modifyInsertion.id = tile.lesson.id;
        this.lessonRestService.update(modifyInsertion).subscribe( res => {
          this.openResponseDialog("Orario", SUCCESS);
          this.sendNotification(0,'Orario Modificato',"L'orario di una tua lezione è stato modificato","ciao",res.teachingDTO.name, res.teachingDTO.idCourse);
          this.reload();
        }, err => {
          this.openResponseDialog("Orario", FAIL);
        });
      }
    });
  }

  private openInsertDialog(tile: Tile) {
    const dialogRef = this.dialog.open(FormDialogComponent, this.configInsertDialog(tile.start, tile.end));
    dialogRef.afterClosed().subscribe( (newInsertion: Lesson) => {
      if(newInsertion) {
        newInsertion.start = tile.start
        newInsertion.end = tile.end;
        newInsertion.date = getFormattedDate(this.selectedDate,2)
        console.log(newInsertion);
        this.lessonRestService.insert(newInsertion).subscribe( res => {
          this.openResponseDialog("Orario", SUCCESS);
          this.reload();
        }, err => {
          console.log(err)
          this.openResponseDialog("Orario", FAIL);
        });
      }
    });
  }

  dateChange(date: Date){
    this.selectedDate = date;
    this.displayDate = getFormattedDate(date, 3);
    this.setTiles(getFormattedDate(date,2));
  }

  setTiles(searchDate){
    this.initTiles();
    this.getLessonByDateAndCourse(searchDate, this.selectedCourse).subscribe( data => {
      data.forEach( (control, index) =>{
        this.setLessonTile(control, index);
      })
      this.lessons = data;
      console.log(this.lessons);
    });
  }

  setLessonTile(lesson: Lesson, index: number) {
    switch(lesson.start) {
      case "08:30:00":
        this.tiles[1].text = getFormattedLesson(lesson);
        this.tiles[1].lesson = lesson;
        break;
      case "09:30:00":
        this.tiles[3].text = getFormattedLesson(lesson);
        this.tiles[3].lesson = lesson;
        break;
      case "10:30:00":
        this.tiles[5].text = getFormattedLesson(lesson);
        this.tiles[5].lesson = lesson;
        break;
      case "11:30:00":
        this.tiles[7].text = getFormattedLesson(lesson);
        this.tiles[7].lesson = lesson;
        break;
      case "12:30:00":
        this.tiles[9].text = getFormattedLesson(lesson);
        this.tiles[9].lesson = lesson;
        break;
      case "15:00:00":
        this.tiles[11].text = getFormattedLesson(lesson);
        this.tiles[11].lesson = lesson;
        break;
      case "16:00:00":
        this.tiles[13].text = getFormattedLesson(lesson);
        this.tiles[13].lesson = lesson;
        break;
      case "17:00:00":
        this.tiles[15].text = getFormattedLesson(lesson);
        this.tiles[15].lesson = lesson;
        break;
      default:
        console.log("trovato nulla");
    }
  }

  courseChange() {
    this.dateChange(this.selectedDate);
    this.getTeachingByCourse(this.selectedCourse);
  }

  openResponseDialog(name: string, res: number) {
    const responseDialog = this.dialog.open(ResponseDialogComponent, this.configResponseDialog(name, res));
  }

  configResponseDialog(name: string, res: number) {
    var dialogBuilder = new DialogBuilder();
    dialogBuilder.addResponse(name,res);
    return dialogBuilder.getConfigResponseDialog();
  }

  configInsertDialog(start, end) {
    var dialogBuilder = new DialogBuilder();
    dialogBuilder.addTitle("Lezione ore " + start + ' - ' + end);
    dialogBuilder.addSelect('','idTeaching','Insegnamneto',Validators.required,this.teaching,NAME);
    dialogBuilder.addSelect('','idRoom','Aula',Validators.required,this.rooms,NAME);
    return dialogBuilder.getConfigInsertDialog();
  }

  configModifyDialog(start,end,lesson: Lesson) {
    var dialogBuilder = new DialogBuilder();
    dialogBuilder.addTitle("Lezione ore " + start + ' - ' + end);
    dialogBuilder.addSelect(lesson.idTeaching,'idTeaching','Insegnamneto',Validators.required,this.teaching,NAME);
    dialogBuilder.addSelect(lesson.idRoom,'idRoom','Aula',Validators.required,this.rooms,NAME);
    dialogBuilder.addSelect(start,'start','Orario',Validators.required, TIME_SET, TIME);
    dialogBuilder.addInput('date',lesson.date,'date','Data',Validators.required);
    return dialogBuilder.getConfigInsertDialog();
  }

  sendNotification(idUser: number, title: string, body: string, data: string, teaching: string, idCourse: number){
    let notification: Notification = {
      type: 'modify-lesson',
      idUser: idUser,
      title: title,
      body: body,
      data: data,
      token_topic: teaching.replace(/ /, '') + "_" + idCourse
    }
    console.log(notification);
    this.notificationRestService.sendToTopic(notification).subscribe( res => {
      console.log(res);
    })
  }

  reload(){
    this.getAllCourseAndTeaching();
    this.getAllRoom();
  }

  getLessonByDateAndCourse(date, idCourse): Observable<Lesson[]> {
    return this.lessonRestService.getByDateAndCourse(date,idCourse);
  }

  getAllCourseAndTeaching() {
    this.courseRestService.getAll().subscribe( data => {
      this.courses = data;
      this.selectedCourse = this.courses[0].id;
      this.getTeachingByCourse(this.courses[0].id);
      this.dateChange(this.selectedDate);
    })
  }

  getTeachingByCourse(idCourse) {
    this.teachingRestService.getByCourse(idCourse).subscribe(data => {
      this.teaching = data;
    })
  }

  getAllRoom() {
    this.roomRestService.getAll().subscribe( data => {
      this.rooms = data;
    })
  }

  initTiles() {
    this.tiles = [
      {start: TIME_SET[0], end: TIME_SET[1], lesson: null, cols: 1, rows: 1, color: '#f9aa33', text: TIME_SET[0]+' - '+TIME_SET[1]},
      {start: "08:30", end: "09:30", lesson: null, cols: 3, rows: 1, color: '#FAFAFA', text: '',},
      {start: "09:30", end: "10:30", lesson: null, cols: 1, rows: 1, color: '#f9aa33', text: '9.30-10.30',},
      {start: "09:30", end: "10:30", lesson: null, cols: 3, rows: 1, color: '#FAFAFA', text: '',},
      {start: "10:30", end: "11:30", lesson: null, cols: 1, rows: 1, color: '#f9aa33', text: '10.30-11.30',},
      {start: "10:30", end: "11:30", lesson: null, cols: 3, rows: 1, color: '#FAFAFA', text: '',},
      {start: "11:30", end: "12:30", lesson: null, cols: 1, rows: 1, color: '#f9aa33', text: '11.30-12.30',},
      {start: "11:30", end: "12:30", lesson: null, cols: 3, rows: 1, color: '#FAFAFA', text: '',},
      {start: "12:30", end: "13:30", lesson: null, cols: 1, rows: 1, color: '#f9aa33', text: '12.30-13.30',},
      {start: "12:30", end: "13:30", lesson: null, cols: 3, rows: 1, color: '#FAFAFA', text: '',},
      {start: "", end: "", lesson: null, cols: 1, rows: 1, color: '#FAFAFA', text: '',},
      {start: "", end: "", lesson: null, cols: 3, rows: 1, color: '#FAFAFA', text: '',},
      {start: "15:00", end: "16:00", lesson: null, cols: 1, rows: 1, color: '#f9aa33', text: '15.00-16.00',},
      {start: "15:00", end: "16:00", lesson: null, cols: 3, rows: 1, color: '#FAFAFA', text: '',},
      {start: "16:00", end: "17:00", lesson: null, cols: 1, rows: 1, color: '#f9aa33', text: '16.00-17.00',},
      {start: "16:00", end: "17:00", lesson: null, cols: 3, rows: 1, color: '#FAFAFA', text: '',},
      {start: "17:00", end: "18:00", lesson: null, cols: 1, rows: 1, color: '#f9aa33', text: '17.00-18.00',},
      {start: "17:00", end: "18:00", lesson: null, cols: 3, rows: 1, color: '#FAFAFA', text: '',},
    ];
  }

  ngOnInit() {
  }
}

function getFormattedLesson(lesson) {
  return lesson.teachingDTO.name + " - " + lesson.teachingDTO.professorDTO.name + " " + lesson.teachingDTO.professorDTO.surname + " - Aula: " + lesson.roomDTO.name;
}

function getFormattedDate(date, option) {
  var year = date.getFullYear();

  var month = (1 + date.getMonth()).toString();
  month = month.length > 1 ? month : '0' + month;

  var day = date.getDate().toString();
  day = day.length > 1 ? day : '0' + day;

  if (option == 1) {
    return day + '-' + month + '-' + year;
  }
  if (option == 2) {
    return year + '-' + month + '-' + day;
  }
  if (option == 3) {
    return DAY[date.getDay()] + " " + date.getDate() + " " + MONTH[date.getMonth()] + " " + date.getFullYear();
  }

}
