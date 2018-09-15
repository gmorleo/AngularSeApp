import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {FormDialogComponent} from '../../../common/form-dialog/form-dialog.component';

@Component({
  selector: 'app-segnalation-dialog',
  templateUrl: './segnalation-dialog.component.html',
  styleUrls: ['./segnalation-dialog.component.css']
})
export class SegnalationDialogComponent implements OnInit {

  formGroup: FormGroup;
  value: number;
  state = [1,2,3,4,5];
  c = 1;

  constructor(private fb: FormBuilder,
              private dialogRef: MatDialogRef<SegnalationDialogComponent>,
              @Inject(MAT_DIALOG_DATA) data) {
    this.value = data.value;
    this.buildForm();
  }

  ngOnInit() {
  }

  buildForm() {
    this.formGroup = this.fb.group( {
      'note': [''],
      'idState': [this.value, Validators.required]
    })
  }

  close() {
    this.dialogRef.close(null);
  }

  save() {
    this.dialogRef.close(this.formGroup.getRawValue());
  }

}
