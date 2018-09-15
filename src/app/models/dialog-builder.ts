import {MatDialogConfig} from '@angular/material';
import {NAME, NAME_SURNAME, SUCCESS, TIME, TIME_END, TIME_START} from '../../Variable';

export class DialogBuilder {

  formConfig = [];
  data = [];
  value: number;
  title: String;
  res: number;

  addData(data) {
    this.data.push(data);
  }

  addValue(value: number) {
    this.value = value;
  }

  addTitle(title: string) {
    this.title = title;
  }

  addInput(type,value,name,placeholder,validators){
    console.log(value);
    this.formConfig.push({
      type: type,
      value: value,
      name: name,
      placeholder: placeholder,
      validators: validators
    })
  }

  addSelect(value,name,placeholder,validators,element,type){
/*    if (!value){
      value = '';
    }*/
    console.log(value);
    this.formConfig.push({
      type: "select",
      value: value,
      name: name,
      placeholder: placeholder,
      validators: validators,
      options: []
    });
    var lenght = (this.formConfig.length - 1)
    if (type == NAME){
      element.forEach( control => {
        this.formConfig[lenght].options.unshift({
          name: control.id,
          value: control.name
        });
      })
    }
    if (type == NAME_SURNAME) {
      element.forEach( control => {
        this.formConfig[lenght].options.unshift({
          name: control.id,
          value: control.name + " " + control.surname
        });
      })
    }
/*    if (type == TIME) {
      element.forEach((control,index) => {
        this.formConfig[lenght].options.push({
          name: control,
          value: control + ' - ' + element[index+1]
        });
      })
      this.formConfig[lenght].options.pop();
    }*/
    if (type == TIME_START) {
      element.forEach((control,index) => {
        this.formConfig[lenght].options.push({
          name: control,
          value: control
        });
      })
      this.formConfig[lenght].options.pop();
    }
    if (type == TIME_END) {
      element.forEach((control,index) => {
        this.formConfig[lenght].options.push({
          name: control,
          value: control
        });
      })
      this.formConfig[lenght].options.shift();
    }

    console.log(this.formConfig);
  }

  addResponse(name: string, res: number) {
    this.res = res;
    if (res == SUCCESS) {
      this.title = name + " inserito correttamente!"
    } else {
      this.title = "Si è verificato un errore "+ name + " non inserito!"
    }
  }

  getConfigInsertDialog(){
    var dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      title: this.title,
      element: this.formConfig,
    };
    return dialogConfig;
  }

  getConfigResponseDialog() {
    var dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      title: this.title,
      response: this.res,
    };
    return dialogConfig;
  }

  getConfigSegnalationDialog() {
    var dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      title: this.title,
      value: this.value,
    };
    return dialogConfig;
  }
}
