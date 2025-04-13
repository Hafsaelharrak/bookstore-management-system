import { Component, OnInit } from '@angular/core'; //this marks the class as a component,which means it controls a part of the UI
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';//this lets us create clickable links to other pages
//these are Angular Material modules to display a pretty table,buttons,and icons
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { BookService } from '../services/book.service';// Girl this , this is my bestie that fetches book data
import { Book } from '../models/book.model'; //and this defines what a book looks like (title,author,etc...)

@Component({
  selector: 'app-book-list',
  standalone: true,
  imports: [CommonModule, RouterLink, MatTableModule, MatButtonModule, MatIconModule],
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css'],
})
export class BookListComponent implements OnInit {
  displayedColumns: string[] = ['title', 'author', 'price', 'actions'];
  dataSource: Book[] = [];

  constructor(private bookService: BookService) {}

  ngOnInit(): void {
    this.loadBooks();
  }

  loadBooks(): void {
    this.bookService.getBooks().subscribe((books) => {
      this.dataSource = books;
    });
  }

  deleteBook(id: number): void {
    if (confirm('Are you sure you want to delete this book?')) {
      this.bookService.deleteBook(id).subscribe(() => {
        this.loadBooks();
      });
    }
  }
}