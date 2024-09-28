import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  private socket$: WebSocketSubject<any>;
  private editStatusSubject = new Subject<{ contactId: string, isEditing: boolean }>();

  constructor() {
    this.socket$ = webSocket('ws://localhost:8080');
    this.socket$.subscribe(
      message => this.handleMessage(message),
      err => console.error(err),
      () => console.warn('Completed!')
    );
  }

  private handleMessage(message: any): void {
    if (message.type === 'editStatus') {
      this.editStatusSubject.next({ contactId: message.contactId, isEditing: message.isEditing });
    }
  }

  getEditStatusUpdates(): Observable<{ contactId: string, isEditing: boolean }> {
    return this.editStatusSubject.asObservable();
  }

  sendEditStatus(contactId: string, isEditing: boolean): void {
    this.socket$.next({ type: 'editStatus', contactId, isEditing });
  }
}