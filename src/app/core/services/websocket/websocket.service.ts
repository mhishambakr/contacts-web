import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  private socket$: WebSocketSubject<any>;
  private editStatusSubject = new Subject<{ contactId: string, isEditing: boolean }>();
  private wsUrl = environment.wsUrl;
  constructor() {
    this.socket$ = webSocket(this.wsUrl);
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