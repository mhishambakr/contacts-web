import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { ContactComponent } from './contact/contact.component';
import { CommonModule } from '@angular/common';
import { ContactService } from '../../core/services/contact/contact.service';
import { HttpClientModule } from '@angular/common/http';
import { ContactItemDto } from '../../core/dtos/contact.dto';

@Component({
  selector: 'app-contacts',
  standalone: true,
  imports: [HeaderComponent, ContactComponent, CommonModule],
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent implements OnInit {
  contacts: ContactItemDto[] = [];

  constructor(private contactService: ContactService) { }

  ngOnInit(): void {
    this.getContacts();
  }

  getContacts(): void {
    this.contactService.getContacts().subscribe((resp) => {
      this.contacts = resp.data.contacts;
    });
  }
}