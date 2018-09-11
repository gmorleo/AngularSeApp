import {MatDialogConfig} from '@angular/material';
import {NAME, NAME_SURNAME, SUCCESS} from '../../Variable';

export class DialogBuilder {

  formConfig = [];
  title: String;
  res: number;

  addTitle(title: string) {
    this.title = title;
  }

  addInput(type,value,name,placeholder,validators){
    this.formConfig.push({
      type: type,
      value: value,
      name: name,
      placeholder: placeholder,
      validators: validators
    })
  }

  addSelect(value,name,placeholder,validators,element,type){
    this.formConfig.push({
      type: "select",
      value: value,
      name: name,
      placeholder: placeholder,
      validators: validators,
      options: []
    });
    var index = (this.formConfig.length - 1)
    if (type == NAME){
      element.forEach( control => {
        this.formConfig[index].options.unshift({
          name: control.id,
          value: control.name
        });
      })
    }
    if (type == NAME_SURNAME) {
      element.forEach( control => {
        this.formConfig[index].options.unshift({
          name: control.id,
          value: control.name + " " + control.surname
        });
      })
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
}
