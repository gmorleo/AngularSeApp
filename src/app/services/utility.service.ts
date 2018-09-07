import { Injectable } from '@angular/core';
import {Sort} from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {

  constructor() { }

  sortItem(sort: Sort, element: any) {
    const data = element.slice();
    if (!sort.active || sort.direction === '') {
      element = data;
      return element;
    }

    element = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'name': return compare(a.name, b.name, isAsc);
        case 'surname': return compare(a.surname, b.surname, isAsc);
        case 'email': return compare(a.email, b.email, isAsc);
        case 'age': return compare(a.age, b.age, isAsc);
        case 'idUser': return compare(a.idUser, b.idUser, isAsc);
        case 'id': return compare(a.id, b.id, isAsc);
        case 'idProfessor': return compare(a.idProfessor, b.idProfessor, isAsc);
        default: return element;
      }
    });
    return element;
  }
}

function compare(a, b, isAsc) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
