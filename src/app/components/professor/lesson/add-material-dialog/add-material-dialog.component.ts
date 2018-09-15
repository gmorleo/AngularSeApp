import { Component, OnInit } from '@angular/core';
import {Room} from '../../../../models/room';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Teaching} from '../../../../models/teaching';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {FormDialogComponent} from '../../../common/form-dialog/form-dialog.component';
import {MatFileUploadQueue} from 'angular-material-fileupload';

@Component({
  selector: 'app-add-material-dialog',
  templateUrl: './add-material-dialog.component.html',
  styleUrls: ['./add-material-dialog.component.css']
})
export class AddMaterialDialogComponent implements OnInit {

  public insertFormGroup: FormGroup;
  public files: Set<File> = new Set();

  afuConfig = {
    uploadAPI: {
      url:"http://localhost:8080/SeApp"
    }
  };

  constructor(private fb: FormBuilder,
              private dialogRef: MatDialogRef<FormDialogComponent>) {
  }

  ngOnInit() {
    this.insertFormGroup = this.createGroup();
  }

  addFiles(){

  }

  createGroup() {
    const group = this.fb.group({
      material: ['',Validators.required]
    });
    return group;
  }

  close() {
    this.dialogRef.close(null);
  }

  save() {
    this.dialogRef.close(this.insertFormGroup);
  }

}
