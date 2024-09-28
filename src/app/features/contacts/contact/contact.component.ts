import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ContactFormComponent } from '../../contact-form/contact-form.component';
import { ContactItemDto } from '../../../core/dtos/contact.dto';
import { ContactService } from '../../../core/services/contact/contact.service';
import { Subscription } from 'rxjs';
import { WebSocketService } from '../../../core/services/websocket/websocket.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule, ContactFormComponent],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent implements OnInit, OnDestroy {
  @Input() contact!: ContactItemDto;
  @Output() delete = new EventEmitter<void>();
  editMode = false;
  isBeingEditedByAnotherUser = false;
  private editStatusSubscription!: Subscription;

  constructor(
    private contactService: ContactService,
    private webSocketService: WebSocketService
  ) { }

  ngOnInit(): void {
    this.editStatusSubscription = this.webSocketService.getEditStatusUpdates().subscribe(status => {
      if (status.contactId === this.contact._id) {
        this.isBeingEditedByAnotherUser = status.isEditing;
      }
    });
  }

  ngOnDestroy(): void {
    if (this.editStatusSubscription) {
      this.editStatusSubscription.unsubscribe();
    }
  }

  editContact(): void {
    if (!this.isBeingEditedByAnotherUser) {
      this.editMode = true;
      this.webSocketService.sendEditStatus(this.contact._id, true);
    }
  }

  deleteContact(): void {
    if (confirm('Are you sure you want to delete this contact?')) {
      this.contactService.deleteContact(this.contact._id).subscribe(() => {
        this.delete.emit();
      });
    }
  }

  onSubmitEditForm(contact: ContactItemDto): void {
    this.contact = {
      ...this.contact,
      ...contact
    };
    this.editMode = false;
    console.log(contact)
    this.webSocketService.sendEditStatus(this.contact._id, false);
  }

  onCancelEditForm(): void {
    this.editMode = false;
    this.webSocketService.sendEditStatus(this.contact._id, false);
  }
}