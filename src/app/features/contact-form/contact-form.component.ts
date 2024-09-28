import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ContactService } from '../../core/services/contact/contact.service';

@Component({
  selector: 'app-contact-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './contact-form.component.html',
  styleUrl: './contact-form.component.scss'
})
export class ContactFormComponent implements OnInit {
  contactForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private contactService: ContactService
  ) { }

  ngOnInit(): void {
    this.contactForm = this.formBuilder.group({
      name: ['', Validators.required],
      phone: ['', Validators.required],
      address: ['', Validators.required],
      notes: ['']
    });
  }

  onSubmit(): void {
    if (this.contactForm.valid) {
      console.log('Form Submitted', this.contactForm.value);
      this.contactService.addContact(this.contactForm.value)
        .subscribe(
          (response) => {
            console.log('Contact added successfully', response);
          },
          (error) => {
            console.error('Error adding contact', error);
          }
        );

    }
  }
}
