import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Student} from '../../../models/student';
import {Professor} from '../../../models/professor';
import {reduce} from 'rxjs/operators';

@Component({
  selector: 'app-form-dialog',
  templateUrl: './form-dialog.component.html',
  styleUrls: ['./form-dialog.component.css']
})
export class FormDialogComponent implements OnInit {

  public insertFormGroup: FormGroup;
  title: string = '';
  config = [];
  result = [];
  new: any;

  constructor(private fb: FormBuilder,
              private dialogRef: MatDialogRef<FormDialogComponent>,
              @Inject(MAT_DIALOG_DATA) data) {
    this.title = data.title;
    this.config = data.element;
    this.new = data.new;
  }

  ngOnInit() {
    this.insertFormGroup = this.createGroup();
  }

  createGroup() {
    const group = this.fb.group({});
    this.config.forEach(control => {
      group.addControl(control.name, this.fb.control(control.value, control.validators));
    });
    return group;
  }

  close() {
    this.dialogRef.close(null);
  }

  save() {
/*    for (var i = 0; i <= (this.config.length - 1); i++){
      this.result.push(this.insertFormGroup.get(this.config[i].name).value)
    }
    console.log(this.result);*/
    this.dialogRef.close(this.insertFormGroup.getRawValue());
  }
}

export function objectFactory(prop: string, value: string) {
  let data: any = {};
  data[prop] = "";
/*  data[prop].value = value;*/
  return data;
}
