import { Component } from '@angular/core'; //component to define the Angular component
import {CommonModule} from '@angular/common'; // this is for common Angular directives(like ngIf,ngFor,etc) 
import { RouterOutlet } from '@angular/router'; //girl this is to display routed components
import {MatToolbarModule} from '@angular/material/toolbar'; //this is for that stylish top bar
@Component({
  selector: 'app-root',
  standalone:true, //this means this component doesnt rely on a module
  imports: [CommonModule,RouterOutlet,MatToolbarModule],
  template:`
  <mat-toolbar color="primary">
    <span>Bookstore Management System</span>
  </mat-toolbar>
  <div class="container">
    <router-outlet></router-outlet>
  </div>
  `,
  styles:[
    `
    .container{
      padding:20px;
    }`
  ]
})
export class AppComponent {}
