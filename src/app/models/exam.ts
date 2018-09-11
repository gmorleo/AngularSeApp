import {Room} from './room';
import {Teaching} from './teaching';

export interface Exam {
  id: number;
  idTeaching: number;
  idRoom: number;
  date: string;
  time: string;
  roomDTO: Room;
  teachingDTO: Teaching;

}
