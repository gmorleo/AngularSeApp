import { Component, OnInit } from '@angular/core';
import {Segnalation} from '../../../models/segnalation';
import {SegnalationRestService} from '../../../services/segnalation-rest.service';
import {Professor} from '../../../models/professor';
import {Validators} from '@angular/forms';
import {EMAIL_REGEX} from '../../../../Variable';
import {Room} from '../../../models/room';
import {RoomRestService} from '../../../services/room-rest.service';
import {MatDialog, MatDialogConfig} from '@angular/material';
import {FormDialogComponent} from '../../common/form-dialog/form-dialog.component';
import {Teaching} from '../../../models/teaching';

@Component({
  selector: 'app-professor-segnalation',
  templateUrl: './professor-segnalation.component.html',
  styleUrls: ['./professor-segnalation.component.css']
})
export class ProfessorSegnalationComponent implements OnInit {

  segnalations: Segnalation[];
  professor: Professor = {} as Professor;
  rooms: Room[];
  formConfig = [];

  constructor(private segnalationRestService: SegnalationRestService,
              private roomRestService: RoomRestService,
              private dialog: MatDialog) {
    this.professor = JSON.parse(localStorage.getItem('user'));
    console.log(this.professor.id);
    this.getSegnalationByIdProfessor();
    this.getAllRoom();
  }

  getSegnalationByIdProfessor() {
    this.segnalationRestService.getByIdProfessor(this.professor.id).subscribe( data => {
      this.segnalations = data;
    })
  }

  getSegnalationByIdRoom(id: number) {
    this.segnalationRestService.getByIdRoom(id).subscribe( data => {
      this.segnalations = data;
    })
  }

  getAllRoom(){
    this.roomRestService.getAll().subscribe( data => {
      this.rooms = data;
    })
  }

  ngOnInit() {
  }

  openNewSegnalationDialog() {
    console.log(this.segnalations);
    this.initForm();
    const dialogConfig = this.configDialog('Inserisci nuova segnalazione');
    const dialogRef = this.dialog.open(FormDialogComponent,dialogConfig);
    dialogRef.afterClosed().subscribe( (res: any) => {
      if (res){
        var newSegnalation: Segnalation = {} as Segnalation;
        newSegnalation.description = res.get("description").value;
        newSegnalation.idState = 1;
        newSegnalation.idProfessor = this.professor.id;
        newSegnalation.idRoom = this.getIdByRoom(res.get("room").value);
        console.log(newSegnalation);
        this.segnalationRestService.insert(newSegnalation).subscribe( res => {
          if(res){
            console.log("ok");
          }
        });
      }
    })
  }

  initForm() {
    this.formConfig = [
      {
        type: 'text',
        name: 'description',
        placeholder: 'Descrizione problema',
        validators: Validators.required
      },
      {
        type: 'select',
        name: 'room',
        placeholder: 'Aula',
        validators: Validators.required,
        options: []
      }
    ];
    this.rooms.forEach(control => {
      this.formConfig[1].options.unshift(control.name);
    })
  }

  initFormRoom() {
    this.formConfig = [
      {
        type: 'select',
        name: 'room',
        placeholder: 'Aula',
        validators: Validators.required,
        options: []
      }
    ];
    this.rooms.forEach(control => {
      this.formConfig[0].options.unshift(control.name);
    })
  }

  configDialog(title: string) {
    var dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      title: title,
      element: this.formConfig,
    };
    return dialogConfig;
  }

  getIdByRoom(name: string) {
    var room: Room = this.rooms.find(function(item) {
      return item.name == name;
    });
    return room.id;
  }

  viewAllSegnalationRoom() {
    this.initFormRoom();
    const dialogConfig = this.configDialog("Seleziona l'aula");
    const dialogRef = this.dialog.open(FormDialogComponent,dialogConfig);
    dialogRef.afterClosed().subscribe( (res: any) => {
      if (res){
        var idRoom = this.getIdByRoom(res.get("room").value);
        console.log(idRoom);
        this.getSegnalationByIdRoom(idRoom);
      }
    })
  }

  viewAllMySegnalation() {
    this.getSegnalationByIdProfessor();
  }
}
