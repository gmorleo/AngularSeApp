import { Component, OnInit } from '@angular/core';
import {Segnalation} from '../../../models/segnalation';
import {SegnalationRestService} from '../../../services/segnalation-rest.service';
import {Professor} from '../../../models/professor';
import {Validators} from '@angular/forms';
import {EMAIL_REGEX, FAIL, NAME, SUCCESS} from '../../../../Variable';
import {Room} from '../../../models/room';
import {RoomRestService} from '../../../services/room-rest.service';
import {MatDialog, MatDialogConfig} from '@angular/material';
import {FormDialogComponent} from '../../common/form-dialog/form-dialog.component';
import {Teaching} from '../../../models/teaching';
import {ResponseDialogComponent} from '../../common/response-dialog/response-dialog.component';
import {DialogBuilder} from '../../../models/dialog-builder';
import {Course} from '../../../models/course';

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
    this.reload();
  }

  openNewSegnalationDialog() {
    const dialogRef = this.dialog.open(FormDialogComponent,this.configInsertDialog());
    dialogRef.afterClosed().subscribe( (newInsertion: Segnalation) => {
      if (newInsertion){
        newInsertion.idState = 1;
        newInsertion.idProfessor = this.professor.id;
        console.log(newInsertion);
        this.segnalationRestService.insert(newInsertion).subscribe( res => {
          this.openResponseDialog("Corso", SUCCESS);
          this.reload();
        }, err => {
          this.openResponseDialog("Corso", FAIL);
        });
      }
    })
  }

  viewAllSegnalationRoom() {
    const dialogRef = this.dialog.open(FormDialogComponent,this.configSelectRoom());
    dialogRef.afterClosed().subscribe( (room: Room) => {
      if (room){
        this.getSegnalationByIdRoom(room.id);
      }
    })
  }

  viewAllMySegnalation() {
    this.getSegnalationByIdProfessor();
  }

  openResponseDialog(name: string, res: number) {
    const responseDialog = this.dialog.open(ResponseDialogComponent, this.configResponseDialog(name, res));
  }

  configResponseDialog(name: string, res: number) {
    var dialogBuilder = new DialogBuilder();
    dialogBuilder.addResponse(name,res);
    return dialogBuilder.getConfigResponseDialog();
  }

  configInsertDialog() {
    var dialogBuilder = new DialogBuilder();
    dialogBuilder.addTitle("Inserisci Segnalazione");
    dialogBuilder.addInput('text','','description','Descrizione problema',Validators.required);
    dialogBuilder.addSelect('','idRoom',"Aula",Validators.required,this.rooms,NAME);
    return dialogBuilder.getConfigInsertDialog();
  }

  configSelectRoom() {
    var dialogBuilder = new DialogBuilder();
    dialogBuilder.addTitle("Seleziona Aula");
    dialogBuilder.addSelect('','id',"Aula",Validators.required,this.rooms,NAME);
    return dialogBuilder.getConfigInsertDialog();
  }

  reload() {
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

}
