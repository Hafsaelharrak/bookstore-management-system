import { Routes } from '@angular/router';
import { BookListComponent } from './book-list/book-list.component';
import {BookFormComponent} from './book-form/book-form.component';
//So Girl basically when someone visits the base URL(/), they get redirected to /books
export const routes: Routes = [
  {path:'',redirectTo:'books',pathMatch:'full'},
  //this shows the book list when visiting /books
  {path:'books',component:BookListComponent},
  //this shows the form to add a book when visiting /books/add
  {path:'books/add',component:BookFormComponent},
  //and finally this shows the same form, but for editing an existing book. :id is a dynamic value (like a book id)
  {path:'books/edit/:id',component:BookFormComponent},
];
