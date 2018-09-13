import { Injectable } from '@angular/core';
import {ServerUrl} from '../../Variable';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Notification} from '../models/notification';

@Injectable({
  providedIn: 'root'
})
export class NotificationRestService {

  apiUserUrl = `${ServerUrl.url}/notification`;

  constructor(public http: HttpClient) {
  }

  sendNotificationSegnalation(notification: Notification): Observable<Notification> {
    let request = this.http.post<Notification>( this.apiUserUrl +"/sendToUser", {
      "title": notification.title,
      "body": notification.body,
      "type": notification.type,
      "idUser": notification.idUser,
      "data": notification.data
    });
    return request;
  }

  sendToTopic(notification: Notification): Observable<Notification> {
    let request = this.http.post<Notification>( this.apiUserUrl +"/sendToTopic", {
      "title": notification.title,
      "body": notification.body,
      "type": notification.type,
      "data": notification.data,
      "idUser": notification.idUser,
      "token_topic": notification.token_topic
    });
    return request;
  }
}
