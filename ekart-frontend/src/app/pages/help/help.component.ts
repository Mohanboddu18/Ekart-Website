import { Component, OnInit } from '@angular/core';
import { HelpService } from '../../services/help.service';
import { HelpTicket } from '../../Modals/EkartModels';

@Component({
  selector: 'app-help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.css']
})
export class HelpComponent implements OnInit {
  faqs: { question: string; answer: string; category: string }[] = [];
  filteredFaqs: { question: string; answer: string; category: string }[] = [];
  selectedCategory = 'all';
  searchQuery = '';
  activeIndex: number | null = null;

  ticketData: HelpTicket = {
    name: '',
    email: '',
    category: 'General',
    subject: '',
    message: ''
  };

  ticketSubmitted = false;
  ticketMessage = '';

  constructor(private helpService: HelpService) {}

  ngOnInit(): void {
    this.helpService.getFaqs().subscribe(data => {
      this.faqs = data;
      this.filteredFaqs = data;
    });
  }

  filterFaqs() {
    this.filteredFaqs = this.faqs.filter(faq => {
      const matchesCat = this.selectedCategory === 'all' || faq.category.toLowerCase() === this.selectedCategory.toLowerCase();
      const matchesSearch = !this.searchQuery || faq.question.toLowerCase().includes(this.searchQuery.toLowerCase()) || faq.answer.toLowerCase().includes(this.searchQuery.toLowerCase());
      return matchesCat && matchesSearch;
    });
  }

  toggleFaq(index: number) {
    this.activeIndex = this.activeIndex === index ? null : index;
  }

  onTicketSubmit() {
    if (!this.ticketData.name || !this.ticketData.email || !this.ticketData.message) {
      return;
    }

    this.helpService.submitTicket(this.ticketData).subscribe(res => {
      if (res.success) {
        this.ticketSubmitted = true;
        this.ticketMessage = res.message;
        this.ticketData = { name: '', email: '', category: 'General', subject: '', message: '' };
      }
    });
  }
}
