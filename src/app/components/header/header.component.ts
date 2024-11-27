import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatCheckboxModule, FormsModule, CommonModule, RouterOutlet],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  @Output() searchQuery = new EventEmitter<string>();
  @Output() filterChange = new EventEmitter<any[]>();

  constructor(private router: Router) {}

  showFilters = false;
  genres = [
    { name: 'Fiction', selected: false },
    { name: 'Non-Fiction', selected: false },
    { name: 'Science', selected: false },
  ];

  toggleFilters() {
    this.showFilters = !this.showFilters;
  }

  onSearch(query: string) {
    this.searchQuery.emit(query);
  }

  onFilterChange() {
    const selectedFilters = this.genres.filter((genre) => genre.selected);
    this.filterChange.emit(selectedFilters);
  }

  navigateToLogin() {
    this.router.navigate(['/auth'], { queryParams: { tab: 'login' } });
  }

  navigateToSignup() {
    this.router.navigate(['/auth'], { queryParams: { tab: 'signup' } });
  }
}
