import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ContactService } from '../../core/services/contact/contact.service';
import { ContactItemDto } from '../../core/dtos/contact.dto';

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
  @Input() contact!: ContactItemDto;
  @Input() editMode = false;
  @Output() submitEditForm = new EventEmitter<ContactItemDto>();
  @Output() cancelEditForm = new EventEmitter<void>();

  ngOnInit(): void {
    if(this.contact){
      this.contactForm = this.formBuilder.group({
        name: [this.contact.name, Validators.required],
        phone: [this.contact.phone, Validators.required],
        address: [this.contact.address, Validators.required],
        notes: [this.contact.notes]
      });
    }else{
      this.contactForm = this.formBuilder.group({
        name: ['', Validators.required],
        phone: ['', Validators.required],
        address: ['', Validators.required],
        notes: ['']
      });
    }
  }

  onCancel(): void {
    this.cancelEditForm.emit();
  }

  onSubmit(): void {
    if (this.contactForm.valid) {
      if(this.editMode){
        this.contactService.updateContact(this.contactForm.value, this.contact._id)
          .subscribe(
            (response) => {
              this.submitEditForm.emit(this.contactForm.value);
            },
            (error) => {
              console.error('Error updating contact', error);
            }
          );
      }else{
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
}
