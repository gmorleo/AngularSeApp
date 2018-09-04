import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {NewProfessorDialogComponent} from '../../secretary/new-professor-dialog/new-professor-dialog.component';

export interface DialogValue {

}

@Component({
  selector: 'app-form-dialog',
  templateUrl: './form-dialog.component.html',
  styleUrls: ['./form-dialog.component.css']
})
export class FormDialogComponent implements OnInit {

  public insertFormGroup: FormGroup;
  title: string = '';
  config = [
    {
      type: 'text',
      name: 'name',
      placeholder: 'Nome',
    },
    {
      type: 'text',
      name: 'surname',
      placeholder: 'Cognome',
    },
    {
      type: 'text',
      name: 'email',
      placeholder: 'Email',
    },
    {
      type: 'password',
      name: 'password',
      placeholder: 'Password',
    }
  ];

  constructor(private fb: FormBuilder,
              private dialogRef: MatDialogRef<FormDialogComponent>,
              @Inject(MAT_DIALOG_DATA) data) {
    this.title = data.title;
    console.log(this.title)
  }

  ngOnInit() {
    this.insertFormGroup = this.createGroup();
  }

  createGroup() {
    const group = this.fb.group({});
    this.config.forEach(control => group.addControl(control.name, this.fb.control(null)));
    return group;
  }

  close() {
    this.dialogRef.close();
  }

  save() {
    this.dialogRef.close();
  }

}
