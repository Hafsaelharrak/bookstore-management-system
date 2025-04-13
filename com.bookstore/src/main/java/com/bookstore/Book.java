package com.bookstore;

import jakarta.persistence.*; //gives JPA (-->Jakarta Persistence API) tools to map my class to a database table. so baaasicaly, it helps Java talk to a databse
import jakarta.validation.constraints.*; //it adds validation rules like 'this field can't be blank' or 'this number must be positive'


import lombok.Data; // this automatically adds getters, setters , toString and stuff like that
import lombok.NoArgsConstructor; //creates a constructor with no params :new com.bookstore.Book()
import lombok.AllArgsConstructor; //creates a constructor that includes aaalll fields :new com.bookstore.Book(id,title,author,price,description)
@Entity //this tells Spring Boot:'Girl this class is an entity which  means it represents a table in the database' so baasically a com.bookstore.Book object becomes a row in the book table
@Data // it adds getters,setters,toString,equals,and hashCode
@NoArgsConstructor //creates an empty constructor
@AllArgsConstructor //creates a constructor with all fields
public class Book {
    @Id //marks this field as the primary key so bscly unique identifier for each book
    @GeneratedValue(strategy=GenerationType.IDENTITY) // this tells the database to auto-generate the ID.
    private Long id;

    @NotBlank(message="Title is required") //this field must noy be empty or blank
    @Size(min=1, max=100, message="Title has to be btw 1 and 100 chars") // this controls the min and max length allowed for the title
    private String title;

    @NotBlank(message="Author is required")
    @Size(min=1, max=100 , message="Author has to be btw 1 and 100 chars")
    private String author;

    @NotNull(message="Price is required") //Girl you must provide a price
    @Positive(message="Price must be positive") //the price has to be greater than 0
    private Double price;

    @Size(max=50, message="Description must be under 500 chars")
    private String description;
}
