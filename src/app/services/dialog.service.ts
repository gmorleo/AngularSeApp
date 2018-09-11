import { Injectable } from '@angular/core';
import {MatDialogConfig} from '@angular/material';

interface formConfigType {
  value: string;
  type: string;
  name: string;
  placeholder: string;
  validators: string;
  option: string[];
}

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  formConfig = [];
  title: String;

  constructor() { }

  addTitle(title: string) {
    this.title = title;
  }

  addInput(type,value,name,placeholder,validators){
    this.formConfig.unshift({
      type: type,
      value: value,
      name: name,
      placeholder: placeholder,
      validators: validators
    })
  }

  addSelect(value,name,placeholder,validators,options){
    this.formConfig.unshift({
      type: "select",
      value: value,
      name: name,
      placeholder: placeholder,
      validators: validators,
      options: options
    })
  }

  getConfigDialog(){
    var dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      title: this.title,
      element: this.formConfig,
    };
    return dialogConfig;
  }
}
