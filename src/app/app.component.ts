import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { firebaseConfig } from '../firebaseConfig';
// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  constructor() {
    initializeApp(firebaseConfig);
  }
  title = 'code-snippets-project';
}
