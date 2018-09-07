import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogConfig, Sort} from '@angular/material';
import {Room} from '../../../models/room';
import {UtilityService} from '../../../services/utility.service';
import {RoomRestService} from '../../../services/room-rest.service';
import {Validators} from '@angular/forms';
import {EMAIL_REGEX} from '../../../../Variable';
import {ResponseDialogComponent} from '../../common/response-dialog/response-dialog.component';
import {FormDialogComponent} from '../../common/form-dialog/form-dialog.component';
import {Student} from '../../../models/student';

@Component({
  selector: 'app-room-management',
  templateUrl: './room-management.component.html',
  styleUrls: ['./room-management.component.css']
})
export class RoomManagementComponent implements OnInit {

  headers: string[] = ['Id', 'Nome','Edificio','Capacità', 'Latitudine', 'Longitudine'];
  rooms: Room[];
  newRoom: Room = {} as Room;
  formConfig = [];

  defSort: Sort = {
    direction: 'asc',
    active: 'id'
  }

  constructor(private utilityService: UtilityService, private roomRestService: RoomRestService, private dialog: MatDialog) { }

  ngOnInit() {
    this.getAllRoom();
  }

  openNewRoomDialog(location: string) {
    const dialogConfig = this.initForm();
    const dialogRef = this.dialog.open(FormDialogComponent,dialogConfig);
    dialogRef.afterClosed().subscribe( res => {
      if (res) {
        this.resolveRes(res);
        this.insertNewRoom(this.newRoom);
      }
    })
  }

  insertNewRoom(room: Room) {
    this.roomRestService.insertNewRoom(room).subscribe(res => {
      if (res.name == room.name) {
        this.openResponseForm("Aula inserita correttamente!",0)
        this.getAllRoom();
      }
    }, err => {
      console.log(err)
    });
  }

  getAllRoom() {
    this.roomRestService.getAll().subscribe( data => {
      this.rooms = data;
      this.sortData(this.defSort);
    }, err => {
      console.log(err)
    })
  }

  openResponseForm(t: string, r: number) {
    const responseConfig = new MatDialogConfig();
    responseConfig.disableClose = true;
    responseConfig.autoFocus = true;
    responseConfig.data = {
      title: t,
      response: r
    }
    const responseDialog = this.dialog.open(ResponseDialogComponent, responseConfig)
  }

  resolveRes(element: any) {
    this.newRoom.name = element.get("name").value;
    this.newRoom.location = element.get("location").value;
    this.newRoom.capacity = element.get("capacity").value;
    this.newRoom.latitude = element.get("latitude").value;
    this.newRoom.longitude = element.get("longitude").value;
  }

  initForm() {
    this.formConfig = [
      {
        type: 'text',
        name: 'name',
        placeholder: 'Nome',
        validators: Validators.required
      },
      {
        type: 'text',
        name: 'location',
        placeholder: 'Edificio',
        validators: Validators.required
      },
      {
        type: 'number',
        name: 'capacity',
        placeholder: 'Capacità',
        validators: Validators.required
      },
      {
        type: 'number',
        name: 'latitude',
        placeholder: 'Latitudine',
        validators:  Validators.required
      },
      {
        type: 'number',
        name: 'longitude',
        placeholder: 'Longitudine',
        validators: Validators.required
      }
    ];

    var dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      title: 'Inserisci nuova Aula',
      element: this.formConfig,
    };
    return dialogConfig;
  }

  sortData(sort: Sort) {
    this.rooms = this.utilityService.sortItem(sort, this.rooms);
  }

}
