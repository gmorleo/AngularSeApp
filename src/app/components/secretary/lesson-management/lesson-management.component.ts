import {AfterViewInit, Component, OnInit} from '@angular/core';
import {LessonRestService} from '../../../services/lesson-rest.service';
import {Lesson} from '../../../models/lesson';
import {Course} from '../../../models/course';
import {CourseRestService} from '../../../services/course-rest.service';
import {DateAdapter, MatDialog, MatDialogConfig} from '@angular/material';
import {stringify} from 'querystring';
import {EMAIL_REGEX} from '../../../../Variable';
import {Validators} from '@angular/forms';
import {Teaching} from '../../../models/teaching';
import {TeachingRestService} from '../../../services/teaching-rest.service';
import {Room} from '../../../models/room';
import {RoomRestService} from '../../../services/room-rest.service';
import {FormDialogComponent} from '../../common/form-dialog/form-dialog.component';
import {identity} from 'rxjs';

export interface Tile {
  start: string;
  end: string;
  idLesson: number;
  color: string;
  cols: number;
  rows: number;
  text: string;
}

const MONTH = ['Gennaio', 'Febbraio', 'Marzo', 'Aprile', 'Maggio', 'Giugno', 'Luglio', 'Agosto', 'Settembre',
  'Ottobre', 'Novembre', 'Dicembre'];

const DAY = ['Lunedì', 'Martedì', 'Mercoledì', 'Giovedì', 'Venerdì', 'Sabato', 'Domenica'];

@Component({
  selector: 'app-lesson-management',
  templateUrl: './lesson-management.component.html',
  styleUrls: ['./lesson-management.component.css']
})
export class LessonManagementComponent implements OnInit, AfterViewInit {

  newLesson: Lesson;
  lessons: Lesson[];
  courses: Course[];
  teaching: Teaching[];
  rooms: Room[];
  selectedCourse: number;
  selectedDate: Date;
  displayDate: string;
  formConfig = [];

  tiles: Tile[] = [];

  constructor(public dialog: MatDialog,
              private roomRestService: RoomRestService,
              private teachingRestService: TeachingRestService,
              private lessonRestService: LessonRestService,
              private courseRestService: CourseRestService,
              private dateAdapter: DateAdapter<Date>) {
    this.dateAdapter.setLocale('it');
  }

  ngOnInit() {
    this.getAllLesson();
    this.getAllTeaching();
    this.getAllCourse();
    this.getAllRoom();
  }

  openLessonDialog(tile: Tile){
    const dialogConfig = this.configDialog(tile.start);
    const dialogRef = this.dialog.open(FormDialogComponent,dialogConfig);
    dialogRef.afterClosed().subscribe( (res: any) => {
      if(res) {
        var newLesson: Lesson = {} as Lesson;
        if (tile.idLesson) {
          newLesson = this.lessons[tile.idLesson];
          newLesson.idTeaching = res.get("teaching").value;
          newLesson.idRoom = res.get("room").value;
          console.log(newLesson);
          this.lessonRestService.modify(newLesson);
        }
        newLesson.start = tile.start;
        newLesson.end = tile.end;
        newLesson.idTeaching = this.getIdByTeaching(res.get("teaching").value);
        newLesson.idRoom = this.getIdByRoom(res.get("room").value);
        newLesson.date = getFormattedDate(this.selectedDate,1);
        console.log(newLesson);
        this.lessonRestService.insert(newLesson).subscribe( res => {
          console.log(res);
          this.getAllLesson();
        })
      }
    });
  }

  initTiles() {
    this.tiles = [
      {start: "08:30:00", end: "09:30:00", idLesson: null, cols: 1, rows: 1, color: '#f9aa33', text: '8.30-9.30',},
      {start: "08:30:00", end: "09:30:00", idLesson: null, cols: 3, rows: 1, color: '#FAFAFA', text: '',},
      {start: "09:30:00", end: "10:30:00", idLesson: null, cols: 1, rows: 1, color: '#f9aa33', text: '9.30-10.30',},
      {start: "09:30:00", end: "10:30:00", idLesson: null, cols: 3, rows: 1, color: '#FAFAFA', text: '',},
      {start: "10:30:00", end: "11:30:00", idLesson: null, cols: 1, rows: 1, color: '#f9aa33', text: '10.30-11.30',},
      {start: "10:30:00", end: "11:30:00", idLesson: null, cols: 3, rows: 1, color: '#FAFAFA', text: '',},
      {start: "11:30:00", end: "12:30:00", idLesson: null, cols: 1, rows: 1, color: '#f9aa33', text: '11.30-12.30',},
      {start: "11:30:00", end: "12:30:00", idLesson: null, cols: 3, rows: 1, color: '#FAFAFA', text: '',},
      {start: "12:30:00", end: "13:30:00", idLesson: null, cols: 1, rows: 1, color: '#f9aa33', text: '12.30-13.30',},
      {start: "12:30:00", end: "13:30:00", idLesson: null, cols: 3, rows: 1, color: '#FAFAFA', text: '',},
      {start: "", end: "09:30:00", idLesson: null, cols: 1, rows: 1, color: '#FAFAFA', text: '',},
      {start: "", end: "09:30:00", idLesson: null, cols: 3, rows: 1, color: '#FAFAFA', text: '',},
      {start: "15:00:00", end: "16:00:00", idLesson: null, cols: 1, rows: 1, color: '#f9aa33', text: '15.00-16.00',},
      {start: "15:00:00", end: "16:00:00", idLesson: null, cols: 3, rows: 1, color: '#FAFAFA', text: '',},
      {start: "16:00:00", end: "17:00:00", idLesson: null, cols: 1, rows: 1, color: '#f9aa33', text: '16.00-17.00',},
      {start: "16:00:00", end: "17:00:00", idLesson: null, cols: 3, rows: 1, color: '#FAFAFA', text: '',},
      {start: "17:00:00", end: "18:00:00", idLesson: null, cols: 1, rows: 1, color: '#f9aa33', text: '17.00-18.00',},
      {start: "17:00:00", end: "18:00:00", idLesson: null, cols: 3, rows: 1, color: '#FAFAFA', text: '',},
    ];
  }

  setTiles(searchDate: string){
    this.initTiles();
    this.lessons.forEach( (contol, index) => {
      if (contol.date == searchDate && contol.teachingDTO.idCourse == this.selectedCourse) {
        this.setLessonTile(contol, index);
      }
    })
  }

  setLessonTile(lesson: Lesson, index: number) {
    console.log(lesson.start);
    switch(lesson.start) {
      case "08:30:00":
        this.tiles[1].text = getFormattedLesson(lesson);
        this.tiles[0].idLesson = index;
        this.tiles[1].idLesson = index;
        break;
      case "09:30:00":
        this.tiles[3].text = getFormattedLesson(lesson);
        this.tiles[3].idLesson = index;
        this.tiles[3].idLesson = index;
        break;
      case "10:30:00":
        this.tiles[5].text = getFormattedLesson(lesson);
        this.tiles[5].idLesson = index;
        this.tiles[5].idLesson = index;
        break;
      case "11:30:00":
        this.tiles[7].text = getFormattedLesson(lesson);
        this.tiles[7].idLesson = index;
        this.tiles[7].idLesson = index;
        break;
      case "12:30:00":
        this.tiles[9].text = getFormattedLesson(lesson);
        this.tiles[9].idLesson = index;
        this.tiles[9].idLesson = index;
        break;
      case "15:00:00":
        this.tiles[11].text = getFormattedLesson(lesson);
        this.tiles[11].idLesson = index;
        this.tiles[11].idLesson = index;
        break;
      case "16:00:00":
        this.tiles[13].text = getFormattedLesson(lesson);
        this.tiles[13].idLesson = index;
        this.tiles[13].idLesson = index;
        break;
      case "17:00:00":
        this.tiles[15].text = getFormattedLesson(lesson);
        this.tiles[15].idLesson = index;
        this.tiles[15].idLesson = index;
        break;
      default:
        console.log("trovato nulla");
    }
  }

  getIdByTeaching(name: string) {
    var teaching: Teaching = this.teaching.find(function(item) {
      return item.name == name;
    });
    return teaching.id;
  }

  getIdByRoom(name: string) {
    var room: Room = this.rooms.find(function(item) {
      return item.name == name;
    });
    return room.id;
  }

  dateChange(date: Date){
    this.selectedDate = date;
    this.displayDate = getFormattedDate(date, 2);
    var searchDate = getFormattedDate(date,1);
    this.setTiles(searchDate);
  }


  courseChange() {
    this.dateChange(this.selectedDate);
  }

  getAllLesson() {
    this.lessonRestService.getAll().subscribe( data => {
      this.lessons = data;
      this.setAllLesson(data);
    }, err => {
      console.log(err)
    });
  }

  getAllTeaching() {
    this.teachingRestService.getAll().subscribe( data => {
      this.setAllTeaching(data);
    }, err => {
      console.log(err)
    })
  }

  getAllCourse() {
    this.courseRestService.getAll().subscribe( data => {
      this.courses = data;
      this.selectedCourse = this.courses[0].id;
    }, err => {
      console.log(err)
    })
  }

  getAllRoom() {
    this.roomRestService.getAll().subscribe( data => {
      this.rooms = data;
    }, err => {
      console.log(err)
    })
  }

  setAllRoom(rooms: Room[]){
    this.rooms = rooms;
  }

  setAllTeaching(teaching: Teaching[]){
    this.teaching = teaching;
    console.log(this.teaching);
  }

  setAllLesson(lessons: Lesson[]){
    this.lessons = lessons;
  }

  configDialog(time: string) {
    this.initForm();
/*    this.formConfig[0].value = teaching;
    this.formConfig[1].value = room;*/
    var dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      title: 'Orario Lezione: ' + time,
      element: this.formConfig,
    };
    return dialogConfig;
  }

  initForm() {
    this.formConfig = [
      {
        value: '',
        type: 'select',
        name: 'teaching',
        placeholder: 'Insegnamento',
        validators: Validators.required,
        options: []
      },
      {
        value: '',
        type: 'select',
        name: 'room',
        placeholder: 'Aula',
        validators: Validators.required,
        options: []
      }
    ];
    this.teaching.forEach( control => {
      this.formConfig[0].options.unshift(control.name);
    });
    this.rooms.forEach( control => {
      this.formConfig[1].options.unshift(control.name);
    });
  }

  ngAfterViewInit(): void {
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
  } else {
    return DAY[date.getDay()] + " " + date.getDate() + " " + MONTH[date.getMonth()] + " " + date.getFullYear();
  }

}
