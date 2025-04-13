import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, Validators,ReactiveFormsModule, FormGroup } from '@angular/forms';
import { BookService } from '../services/book.service';  // Updated path
import { Book } from '../models/book.model';  // Make sure this path is correct
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatError } from '@angular/material/form-field';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-book-form',
  standalone: true,
  imports: [
     CommonModule,
    ReactiveFormsModule,
    RouterModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatError],
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.css']
})
export class BookFormComponent implements OnInit {
  bookForm: FormGroup;  // Explicitly typed FormGroup
  isEditMode = false;
  bookId?: number;

  constructor(
    @Inject(FormBuilder) private fb: FormBuilder,
    @Inject(BookService) private bookService: BookService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    // Initialize the form in constructor
    this.bookForm = this.fb.group({
      title: ['', [Validators.required, Validators.maxLength(100)]],
      author: ['', [Validators.required, Validators.maxLength(100)]],
      price: [0, [Validators.required, Validators.min(0)]],  // Changed default to 0
      description: ['', [Validators.maxLength(500)]]
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.bookId = +id;
      this.loadBook(this.bookId);
    }
  }

  loadBook(id: number): void {
    this.bookService.getBook(id).subscribe((book: Book) => {
      this.bookForm.patchValue(book);
    });
  }

  onSubmit(): void {
    console.log('Form submitted', this.bookForm.value); // Debug log 1
    console.log('Form valid?', this.bookForm.valid);    // Debug log 2

    if (this.bookForm.valid) {
      const bookData: Book = this.bookForm.value;
      console.log('Submitting:', bookData);             // Debug log 3

      if (this.isEditMode && this.bookId) {
        this.bookService.updateBook(this.bookId, bookData).subscribe({
          next: () => {
            console.log('Update successful');           // Debug log 4
            this.router.navigate(['/books']);
          },
          error: (err) => {
            console.error('Update failed:', err);       // Debug log 5
          }
        });
      } else {
        this.bookService.createBook(bookData).subscribe({
          next: () => {
            console.log('Create successful');           // Debug log 6
            this.router.navigate(['/books']);
          },
          error: (err) => {
            console.error('Create failed:', err);       // Debug log 7
          }
        });
      }
    }
  }
}