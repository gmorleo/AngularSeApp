import {Component, Inject, OnInit} from '@angular/core';
import {SuccessDialogComponent} from '../success-dialog/success-dialog.component';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-response-dialog',
  templateUrl: './response-dialog.component.html',
  styleUrls: ['./response-dialog.component.css']
})
export class ResponseDialogComponent implements OnInit {

  title:string;
  response: number;

  constructor(private dialogRef: MatDialogRef<SuccessDialogComponent>, @Inject(MAT_DIALOG_DATA) data) {
    this.title = data.title;
    this.response = data.response;
  }

  ngOnInit() {
  }

  close() {
    this.dialogRef.close();
  }

}
