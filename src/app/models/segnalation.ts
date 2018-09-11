import {Professor} from "./professor";
import {Room} from "./room";
import {SegnalationState} from './segnalationState';

export interface Segnalation {

  id:number;
  note:string;
  description:string;
  idState:number;
  idRoom:number;
  idProfessor:number;
  segnalationStateDTO: SegnalationState;
  professorDTO:Professor;
  roomDTO:Room;

}
