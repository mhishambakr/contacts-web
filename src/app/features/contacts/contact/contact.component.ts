import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ContactFormComponent } from '../../contact-form/contact-form.component';
import { ContactItemDto } from '../../../core/dtos/contact.dto';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule, ContactFormComponent],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent {
  constructor() { }
  @Input() contact!: ContactItemDto;
  editMode = false;

  editContact(): void {
    this.editMode = true;
  }

  deleteContact(): void {
    console.log('Delete contact', this.contact);
  }

  onSubmitEditForm(contact:ContactItemDto): void {
    this.contact = contact
    this.editMode = false;
  }

  onCancelEditForm(): void {
    this.editMode = false;
  }
}
