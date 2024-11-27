import { Component, OnInit } from '@angular/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-book-grid',
  standalone: true,
  imports: [MatCheckboxModule, FormsModule, CommonModule],
  templateUrl: './book-grid.component.html',
  styleUrls: ['./book-grid.component.css'],
})
export class BookGridComponent implements OnInit {
  books: any[] = [];

  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.fetchBooks();
  }

  fetchBooks() {
    console.log('Fetching books...');
    this.apiService.getBooks().subscribe(
      (data: any) => {
        console.log('Books fetched:', data[0].imageUrl);
        this.books = data;
      },
      (error) => {
        console.error('Error fetching books:', error);
      }
    );
  }

  buyBook(bookId: number) {
    console.log(`Buying book with id: ${bookId}`);
  }
}
