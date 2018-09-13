import { Component, OnInit } from '@angular/core';
import {SegnalationRestService} from '../../../services/segnalation-rest.service';
import {Segnalation} from '../../../models/segnalation';
import {FormControl, Validators} from '@angular/forms';
import {FAIL, NAME, SUCCESS} from '../../../../Variable';
import {DialogBuilder} from '../../../models/dialog-builder';
import {setUpControl} from '@angular/forms/src/directives/shared';
import {Course} from '../../../models/course';
import {FormDialogComponent} from '../../common/form-dialog/form-dialog.component';
import {MatDialog} from '@angular/material';
import {SegnalationDialogComponent} from './segnalation-dialog/segnalation-dialog.component';
import {ResponseDialogComponent} from '../../common/response-dialog/response-dialog.component';
import {NotificationRestService} from '../../../services/notification-rest.service';
import {Notification} from '../../../models/notification';

@Component({
  selector: 'app-segnalation-management',
  templateUrl: './segnalation-management.component.html',
  styleUrls: ['./segnalation-management.component.css']
})
export class SegnalationManagementComponent implements OnInit {

  segnalations: Segnalation[];
  state = ["da visionare","in elaborazione","completate"];
  StateCode = [1,2,3,4,5];

  constructor(private segnalationRestService: SegnalationRestService,
              private notificationRestService: NotificationRestService,
              private dialog: MatDialog) {
    this.reload();
  }

  openSegnalationDialog(segnalation: Segnalation) {
    console.log(segnalation);
    const dialogRef = this.dialog.open(SegnalationDialogComponent,this.configModifySegnalation(segnalation.idState));
    dialogRef.afterClosed().subscribe( (modifyInsertion: Segnalation) => {
      if(modifyInsertion){
        console.log(modifyInsertion);
        segnalation.idState = modifyInsertion.idState;
        segnalation.note = modifyInsertion.note;
        console.log(segnalation);
        this.segnalationRestService.update(segnalation).subscribe( res => {
          this.openResponseDialog("Segnalazione", SUCCESS);
          this.sendNotification(segnalation.professorDTO.idUser,'Stato Segnalazione modificato', 'Lo stato della segnalazione è stato modificato')
          this.reload();
        }, err => {
          this.openResponseDialog("Segnalazione", FAIL);
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

  configModifySegnalation(state: number) {
    var dialogBuilder = new DialogBuilder();
    dialogBuilder.addTitle("Modifica Segnalazione");
    dialogBuilder.addValue(state);
    return dialogBuilder.getConfigSegnalationDialog();
  }

  reload() {
    this.getAllSegnalation();
  }

  sendNotification(idUser: number, title: string, body: string){
    let notification: Notification = {
      type: 'modify-segnalation',
      idUser: idUser,
      title: title,
      body: body,
      data: '',
      token_topic: ''
    }
    this.notificationRestService.sendNotificationSegnalation(notification).subscribe( res => {
      console.log(res);
    })
  }

  getAllSegnalation(){
    this.segnalationRestService.getAll().subscribe( data => {
      this.segnalations = data;
    })
  }

  ngOnInit() {
  }


}
