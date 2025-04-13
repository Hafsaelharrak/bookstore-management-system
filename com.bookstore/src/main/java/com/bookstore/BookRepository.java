package com.bookstore;
import org.springframework.data.jpa.repository.JpaRepository; //so basicallyyy this brings in Spring Data JPA's magical interface that makes database access super easy.its like telling Java:"hey boo,i don't wanna write boring SQL. Can you pretty please just handle that for me? "
import com.bookstore.Book;
public interface BookRepository extends JpaRepository<Book, Long> {
}
