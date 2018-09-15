import {Component, Inject, OnInit} from '@angular/core';
import {AngularFireStorage, AngularFireUploadTask} from 'angularfire2/storage';
import {Observable} from 'rxjs';
import {AngularFirestore} from 'angularfire2/firestore';
import {UploadTask} from 'angularfire2/storage/interfaces';
import {finalize} from 'rxjs/operators';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {FormDialogComponent} from '../../../common/form-dialog/form-dialog.component';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Material} from '../../../../models/material';

@Component({
  selector: 'app-upload-dialog',
  templateUrl: './upload-dialog.component.html',
  styleUrls: ['./upload-dialog.component.css']
})
export class UploadDialogComponent implements OnInit {

  formGroup: FormGroup;
  // Main task
  task: AngularFireUploadTask;

  // Progress monitoring
  percentage: Observable<number>;

  snapshot: Observable<any>;

  // Download URL
  downloadURL: Observable<string>;

  // State for dropzone CSS toggling
  isHovering: boolean;

  constructor(private fb: FormBuilder,
              private storage: AngularFireStorage, private db: AngularFirestore,
              private dialogRef: MatDialogRef<UploadDialogComponent>,
              @Inject(MAT_DIALOG_DATA) data) {
    this.buildForm();
  }

  toggleHover(event: boolean) {
    this.isHovering = event;
  }

  startUpload(event: FileList) {
    // The File object
    const file = event.item(0)

    // Client-side validation example
/*    if (file.type.split('/')[0] !== 'image') {
      console.error('unsupported file type :( ')
      return;
    }*/

    // The storage path
    const path = `test/${new Date().getTime()}_${file.name}`;
    const fileRef = this.storage.ref(path);
    console.log(path);
    console.log(fileRef);

    // Totally optional metadata
    const customMetadata = { app: 'AngularSeApp!' };

    // The main task
    this.task = this.storage.upload(path, file, { customMetadata });
    console.log("qui");

    // Progress monitoring
    this.percentage = this.task.percentageChanges();
    this.snapshot   = this.task.snapshotChanges()

    // The file's download URL
    this.task.snapshotChanges().pipe(
      finalize(() => this.downloadURL = fileRef.getDownloadURL() )
    ).subscribe( res => {
      console.log(res);
      console.log(this.downloadURL);
    })
  }

  // Determines if the upload task is active
  isActive(snapshot) {
    return snapshot.state === 'running' && snapshot.bytesTransferred < snapshot.totalBytes
  }

  close() {
    this.dialogRef.close(null);
  }

  buildForm() {
    this.formGroup = this.fb.group( {
      'name': ['', Validators.required]
    })
  }

  save() {
    this.downloadURL.subscribe( url => {
      var material: Material = {} as Material;
      console.log(url);
      console.log(this.formGroup.get("name").value);
      material.link = url;
      material.name = this.formGroup.get("name").value;
      this.dialogRef.close(material);
    })
  }

  ngOnInit() {
  }

}
