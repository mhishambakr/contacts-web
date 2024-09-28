import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ContactItemDto } from '../../dtos/contact.dto';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(
    private http: HttpClient
  ) { }

  getContacts({ page, limit }: { page: number, limit: number }) {
    return this.http.get<any>(
      `http://localhost:3000/api/contact`,
      {
        params: {
          page,
          limit
        }
      }
    )
  }

  addContact(contact: ContactItemDto) {
    return this.http.post(
      `http://localhost:3000/api/contact`,
      contact
    )
  }

  updateContact(contact: ContactItemDto, _id: string) {
    return this.http.put(
      `http://localhost:3000/api/contact`,
      {
        ...contact,
        _id
      }
    )
  }
}
