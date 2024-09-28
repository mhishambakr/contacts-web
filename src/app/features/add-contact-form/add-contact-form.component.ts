import { Component } from '@angular/core';
import { ContactFormComponent } from '../contact-form/contact-form.component';
import { HeaderComponent } from '../../shared/components/header/header.component';

@Component({
  selector: 'app-add-contact-form',
  standalone: true,
  imports: [ContactFormComponent, HeaderComponent],
  templateUrl: './add-contact-form.component.html',
  styleUrl: './add-contact-form.component.scss'
})
export class AddContactFormComponent {

}
