import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { ContactComponent } from './contact/contact.component';
import { CommonModule } from '@angular/common';
import { ContactService } from '../../core/services/contact/contact.service';
import { ContactItemDto } from '../../core/dtos/contact.dto';
import { PaginatorComponent } from '../../shared/components/paginator/paginator.component';

@Component({
  selector: 'app-contacts',
  standalone: true,
  imports: [HeaderComponent, ContactComponent, CommonModule, PaginatorComponent],
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent implements OnInit {
  contacts: ContactItemDto[] = [];
  currentPage: number = 1;
  totalPages: number = 1;
  limit: number = 5;

  constructor(private contactService: ContactService) { }

  ngOnInit(): void {
    this.getContacts();
  }

  getContacts(): void {
    this.contactService.getContacts({ page: this.currentPage, limit: this.limit }).subscribe((resp) => {
      this.contacts = resp.data.contacts;
      this.totalPages = Math.ceil(Number(resp.data.total)/this.limit);
    });
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.getContacts();
  }

  onDelete(): void {
    this.getContacts();
  }
}