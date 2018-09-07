import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {FormDialogComponent} from '../../common/form-dialog/form-dialog.component';
import {Room} from '../../../models/room';
import {Teaching} from '../../../models/teaching';

@Component({
  selector: 'app-lesson-dialog',
  templateUrl: './lesson-dialog.component.html',
  styleUrls: ['./lesson-dialog.component.css']
})
export class LessonDialogComponent implements OnInit {

  public insertFormGroup: FormGroup;
  rooms: Room[];
  teaching: Teaching[];
  title: string = '';
  config = [];
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
    const group = this.fb.group({
      teaching: ['null',Validators.required],
      room: ['null',Validators.required],
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
