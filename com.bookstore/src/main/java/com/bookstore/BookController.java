package com.bookstore;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity; //this helps us return HTTP responses properly -- with data and status codes (like 200 OK, 404 Not Found,etc)
import org.springframework.web.bind.annotation.*; //this pulls in all the REST API annotations like: @GetMapping @PostMapping @PutMapping @DeleteMapping so I can build my API endpoints
import java.util.List;
@CrossOrigin(origins = "http://localhost:4200", maxAge = 3600)
@RestController //this marks the class as REST controller -- meaning it handles HTTP requests and returns JSON data (not HTML) basically Spring Boot says:"this class is gonna talk to the world via web calls"
@RequestMapping("/api/books") //this means :"all the endpoints in this controller will start with /api/books" so the routes will look like: GET /api/books GET /api/books/1
public class BookController {
    @Autowired
    private BookService bookService;
//when someone sends a GET request to /api/books, it returns all the books
    @GetMapping
    public List<Book>getAllBooks(){
        return bookService.getAllBooks();
    }
//example:GET /api/books/1   this grabs the book with the id 1 and returns the book if found, wrapped in a ResponseEntity (with HTTP 200 OK)
    @GetMapping("/{id}")
    public ResponseEntity<Book> getBooksById(@PathVariable Long id){
        Book book=bookService.getBookById(id);
        return ResponseEntity.ok(book);
    }
//example:POST/api/books with JSON data this adds a new book to the database. the book data comes from the request body (that's what @RequestBody means)
@PostMapping
@CrossOrigin(origins = "http://localhost:4200")
public ResponseEntity<Book> createBook(@RequestBody Book book) {
    Book savedBook = bookService.saveBook(book);
    return ResponseEntity.ok()
            .header("Access-Control-Allow-Origin", "http://localhost:4200")
            .header("Access-Control-Allow-Methods", "POST, GET, PUT, OPTIONS, DELETE")
            .header("Access-Control-Allow-Headers", "Content-Type")
            .body(savedBook);
}
//example:PUT/api/books/2 with a new JSON data this updates the book with the id 2 so what happens is : first it finds the existing book and then it updates the fields with the new values and after that it saves it again and finally it returns the updated book
    @PutMapping("/{id}")
    public ResponseEntity<Book> updateBook(@PathVariable Long id, @RequestBody Book bookDetails){
        Book book =bookService.getBookById(id);
        book.setTitle(bookDetails.getTitle());
        book.setAuthor(bookDetails.getAuthor());
        book.setPrice(bookDetails.getPrice());
        book.setDescription(bookDetails.getDescription());

        Book updatedBook=bookService.saveBook(book);
        return ResponseEntity.ok(updatedBook);
    }
//example: DELETE/api/books/3 this deletes the book with the id 3 and it returns an empty response with status 200 OK if successful
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteBook(@PathVariable Long id){
        bookService.deleteBook(id);
        return ResponseEntity.ok().build();
    }
}
