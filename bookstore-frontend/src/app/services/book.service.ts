import { Injectable } from '@angular/core';//this tells Angular that the file is a service i can inject aka share across my app
import { HttpClient } from '@angular/common/http'; //this lets service sebd HTTP requests(GET,POST,PUT,DELETE)
import { Observable,tap } from 'rxjs'; //observable means we're working with async data.When the request finishes , the response will "come back" like a text message
import { Book } from '../models/book.model'; //Girl this brings in the Book interface(or class), so TypeScript knows the shape of my book data (like title,author,price,etc..)

//this tells Angular :"Girl make this service available everywhere in the app"
@Injectable({
  providedIn: 'root',
})

export class BookService {
  private apiUrl = 'http://localhost:8080/api/books'; //this sets the base URL for my API.every request will go to this URL to manage books.let think of it like a warehouse where all my book data lives

//this injects the HTTPClient into the service so i can send requests like GET,POST,etc.its like giving my service a phone to call the backend
  constructor(private http: HttpClient) {}

  getBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(this.apiUrl);
  }

  getBook(id: number): Observable<Book> {
    return this.http.get<Book>(`${this.apiUrl}/${id}`);
  }

  createBook(book: Book): Observable<Book> {
    console.log('Sending to API:', book); // Debug log
    return this.http.post<Book>(`${this.apiUrl}`, book).pipe(
      tap(response => console.log('API response:', response))
    );
  }

  updateBook(id: number, book: Book): Observable<Book> {
    return this.http.put<Book>(`${this.apiUrl}/${id}`, book);
  }

  deleteBook(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}