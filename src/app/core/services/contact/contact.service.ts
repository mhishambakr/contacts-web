import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ContactItemDto } from '../../dtos/contact.dto';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private apiUrl = environment.apiUrl;
  constructor(
    private http: HttpClient
  ) { }

  getContacts({ page, limit }: { page: number, limit: number }) {
    return this.http.get<any>(
      `${this.apiUrl}/contact`,
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
      `${this.apiUrl}/contact`,
      contact
    )
  }

  updateContact(contact: ContactItemDto, _id: string) {
    return this.http.put(
      `${this.apiUrl}/contact`,
      {
        ...contact,
        _id
      }
    )
  }

  deleteContact(_id: string) {
    return this.http.delete(
      `${this.apiUrl}/contact`,
      {
        params: {
          _id
        }
      }
    )
  }
  
}
