import { Component, OnInit } from '@angular/core';
import {LessonRestService} from '../../../services/lesson-rest.service';
import {Lesson} from '../../../models/lesson';
import {Course} from '../../../models/course';
import {CourseRestService} from '../../../services/course-rest.service';
import {DateAdapter, MatDialogConfig} from '@angular/material';
import {stringify} from 'querystring';
import {EMAIL_REGEX} from '../../../../Variable';
import {Validators} from '@angular/forms';
import {Teaching} from '../../../models/teaching';
import {TeachingRestService} from '../../../services/teaching-rest.service';
import {Room} from '../../../models/room';
import {RoomRestService} from '../../../services/room-rest.service';
import {FormDialogComponent} from '../../common/form-dialog/form-dialog.component';

export interface Tile {
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
export class LessonManagementComponent implements OnInit {

  lessons: Lesson[];
  courses: Course[];
  teaching: Teaching[];
  rooms: Room[];
  selected: number;
  selectedDate: Date;
  displayDate: string;
  formConfig = [];
  selectedCourse: Course = {} as Course;

  tiles: Tile[] = [
    {idLesson: null, cols: 1, rows: 1, color: '#f9aa33', text: '8.30-9.30',},
    {idLesson: null, cols: 3, rows: 1, color: '#FAFAFA', text: '',},
    {idLesson: null, cols: 1, rows: 1, color: '#f9aa33', text: '9.30-10.30',},
    {idLesson: null, cols: 3, rows: 1, color: '#FAFAFA', text: '',},
    {idLesson: null, cols: 1, rows: 1, color: '#f9aa33', text: '10.30-11.30',},
    {idLesson: null, cols: 3, rows: 1, color: '#FAFAFA', text: '',},
    {idLesson: null, cols: 1, rows: 1, color: '#f9aa33', text: '11.30-12.30',},
    {idLesson: null, cols: 3, rows: 1, color: '#FAFAFA', text: '',},
    {idLesson: null, cols: 1, rows: 1, color: '#f9aa33', text: '12.30-13.30',},
    {idLesson: null, cols: 3, rows: 1, color: '#FAFAFA', text: '',},
    {idLesson: null, cols: 1, rows: 1, color: '#BBBBBB', text: '',},
    {idLesson: null, cols: 3, rows: 1, color: '#BBBBBB', text: '',},
    {idLesson: null, cols: 1, rows: 1, color: '#f9aa33', text: '15.00-16.00',},
    {idLesson: null, cols: 3, rows: 1, color: '#FAFAFA', text: '',},
    {idLesson: null, cols: 1, rows: 1, color: '#f9aa33', text: '16.00-17.00',},
    {idLesson: null, cols: 3, rows: 1, color: '#FAFAFA', text: '',},
    {idLesson: null, cols: 1, rows: 1, color: '#f9aa33', text: '17.00-18.00',},
    {idLesson: null, cols: 3, rows: 1, color: '#FAFAFA', text: '',},
  ];

  constructor(private roomRestService: RoomRestService, private teachingRestService: TeachingRestService, private lessonRestService: LessonRestService, private courseRestService: CourseRestService, private dateAdapter: DateAdapter<Date>) {
    this.dateAdapter.setLocale('it');
  }

  ngOnInit() {
    this.getAllLesson();
    this.getAllTeaching();
    this.getAllCourse();
    this.getAllRoom();
  }

  setTiles(searchDate: string){
    this.lessons.forEach( contol => {
      if (contol.date == searchDate) {
        this.setLessonTile(contol);
      }
    })
  }

  setLessonTile(lesson: Lesson) {
    console.log(lesson.start);
    switch(lesson.start) {
      case "08:30:00":
        this.tiles[1].text = getFormattedLesson(lesson);
        this.tiles[0].idLesson = lesson.id;
        this.tiles[1].idLesson = lesson.id;
        break;
      case "09:30:00":
        this.tiles[3].text = getFormattedLesson(lesson);
        this.tiles[3].idLesson = lesson.id;
        this.tiles[3].idLesson = lesson.id;
        break;
      case "10:30:00":
        this.tiles[5].text = getFormattedLesson(lesson);
        this.tiles[5].idLesson = lesson.id;
        this.tiles[5].idLesson = lesson.id;
        break;
      case "11:30:00":
        this.tiles[7].text = getFormattedLesson(lesson);
        this.tiles[7].idLesson = lesson.id;
        this.tiles[7].idLesson = lesson.id;
        break;
      case "12:30:00":
        this.tiles[9].text = getFormattedLesson(lesson);
        this.tiles[9].idLesson = lesson.id;
        this.tiles[9].idLesson = lesson.id;
        break;
      case "15:00:00":
        this.tiles[11].text = getFormattedLesson(lesson);
        this.tiles[11].idLesson = lesson.id;
        this.tiles[11].idLesson = lesson.id;
        break;
      case "16:00:00":
        this.tiles[13].text = getFormattedLesson(lesson);
        this.tiles[13].idLesson = lesson.id;
        this.tiles[13].idLesson = lesson.id;
        break;
      case "17:00:00":
        this.tiles[15].text = getFormattedLesson(lesson);
        this.tiles[15].idLesson = lesson.id;
        this.tiles[15].idLesson = lesson.id;
        break;
      default:
        console.log("trovato nulla");
    }
  }


  dateChange(date: Date){
    this.selectedDate = date;
    this.displayDate = getFormattedDate(date, 2);
    var searchDate = getFormattedDate(date,1);
    this.setTiles(searchDate);
  }

  openLessonDialog(tile: Tile){
    console.log(tile);
/*    const dialogConfig = this.configDialog(tile.start,tile.idLesson);
    const dialogRef = this.dialog.open(FormDialogComponent,dialogConfig);
    dialogRef.afterClosed().subscribe( (res: any) => {

    });*/
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
      this.selected = this.courses[0].id;
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
  }

  setAllLesson(lessons: Lesson[]){
    this.lessons = lessons;
  }

  configDialog(time: string, teaching: string, room: string) {
    this.formConfig[0].value = teaching;
    this.formConfig[1].value = room;
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
      this.formConfig[1].options.unshift(control.name);
    });
    this.rooms.forEach( control => {
      this.formConfig[1].options.unshift(control.name);
    });
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
