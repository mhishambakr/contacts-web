import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ContactFormComponent } from '../../contact-form/contact-form.component';
import { ContactItemDto } from '../../../core/dtos/contact.dto';
import { ContactService } from '../../../core/services/contact/contact.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule, ContactFormComponent],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent {
  constructor(
    private contactService: ContactService
  ) { }
  @Input() contact!: ContactItemDto;
  @Output() delete = new EventEmitter<void>();
  editMode = false;

  editContact(): void {
    this.editMode = true;
  }

  deleteContact(): void {
    if (confirm('Are you sure you want to delete this contact?')) {
      this.contactService.deleteContact(this.contact._id).subscribe(() => {
        this.delete.emit();
      });
    }
  }

  onSubmitEditForm(contact:ContactItemDto): void {
    this.contact = contact
    this.editMode = false;
  }

  onCancelEditForm(): void {
    this.editMode = false;
  }
}
