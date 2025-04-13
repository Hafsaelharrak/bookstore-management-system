package com.bookstore;
import org.springframework.beans.factory.annotation.Autowired; //this is how Spring boot injects dependencies into my classes its literally like giving my class a helper without me doing the work
import org.springframework.stereotype.Service; //this tells Spring Boot that this class is a Service, aka a layer where logic goes (not database,not web controller-- just clean business logic)
import java.util.List;
@Service // so when I put this above the class , it a way of saying : "this class is special.treat it like an official helper in the project" and then Spring registers it and makes it injectable in others places, like a controller
public class BookService {
    @Autowired
    private BookRepository bookRepository;
//so basically when I write these two lines im saying "Hey Spring,can you give me an instance of BookRepository? I'm way too fabulous to be creating it myself" and then Spring responds "of course girl, I got you"
    public List<Book>getAllBooks(){
        return bookRepository.findAll();
    }
    public Book getBookById(Long id){
        return bookRepository.findById(id).orElse(null);
    }
    public Book saveBook(Book book){
        return bookRepository.save(book);
    }
    public void deleteBook(Long id){
        bookRepository.deleteById(id);
    }
}
