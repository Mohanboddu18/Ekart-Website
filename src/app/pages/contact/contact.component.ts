import { Component } from '@angular/core';
import { ContactService } from '../../services/contact.service';
import { ContactMessage } from '../../Modals/EkartModels';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
  formData: ContactMessage = {
    name: '',
    email: '',
    subject: '',
    message: ''
  };

  submitted = false;
  successMessage = '';
  errorMessage = '';

  constructor(private contactService: ContactService) {}

  onSubmit() {
    if (!this.formData.name || !this.formData.email || !this.formData.message) {
      this.errorMessage = 'Please fill out all required fields.';
      return;
    }

    this.errorMessage = '';
    this.contactService.submitContact(this.formData).subscribe(res => {
      if (res.success) {
        this.submitted = true;
        this.successMessage = res.message;
        this.formData = { name: '', email: '', subject: '', message: '' };
      } else {
        this.errorMessage = res.message || 'Failed to submit message.';
      }
    });
  }
}
