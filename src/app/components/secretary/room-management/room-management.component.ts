import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material';
import {Room} from '../../../models/room';
import {UtilityService} from '../../../services/utility.service';
import {RoomRestService} from '../../../services/room-rest.service';
import {Validators} from '@angular/forms';
import {FAIL, SUCCESS} from '../../../../Variable';
import {ResponseDialogComponent} from '../../common/response-dialog/response-dialog.component';
import {FormDialogComponent} from '../../common/form-dialog/form-dialog.component';
import {DialogBuilder} from '../../../models/dialog-builder';

@Component({
  selector: 'app-room-management',
  templateUrl: './room-management.component.html',
  styleUrls: ['./room-management.component.css']
})
export class RoomManagementComponent implements OnInit {

  rooms: Room[];

  constructor(private utilityService: UtilityService, private roomRestService: RoomRestService, private dialog: MatDialog) { }

  ngOnInit() {
    this.getAllRoom();
  }

  openNewRoomDialog(location: string) {
    const dialogRef = this.dialog.open(FormDialogComponent,this.configInsertDialog());
    dialogRef.afterClosed().subscribe( (room: Room) => {
      if (room){
        var newroom = room;
        console.log(newroom);
        this.roomRestService.insert(newroom).subscribe( res => {
          this.openResponseDialog("Aula", SUCCESS);
          this.reload();
        }, err => {
          this.openResponseDialog("Aula", FAIL);
        });
      }
    })
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
    dialogBuilder.addTitle("Inserisci nuova aula");
    dialogBuilder.addInput("text",'','name','Nome aula',Validators.required);
    dialogBuilder.addInput("text",'','location','Edificio',Validators.required);
    dialogBuilder.addInput("number",'','capacity','Capacità',Validators.required);
    dialogBuilder.addInput("number",'','latitude','Latitudine',Validators.required);
    dialogBuilder.addInput("number",'','longitude','Longitudine',Validators.required);
    return dialogBuilder.getConfigInsertDialog();
  }

  reload(){
    this.getAllRoom();
  }

  getAllRoom() {
    this.roomRestService.getAll().subscribe( data => {
      this.rooms = data;
    });
  }

}
