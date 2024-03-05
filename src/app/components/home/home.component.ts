import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { DbService } from '../../services/db.service';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  imports: [RouterLink, CommonModule, FormsModule],
  styleUrls: ['./home.component.css'],
  standalone: true,
})
export class HomeComponent implements OnInit {
  searchTerm: string = '';
  items: { id: string; title: string; author: string; hashtags: string[] }[] =
    [];

  constructor(private dbService: DbService) {}

  ngOnInit(): void {
    this.loadAllSnippets();
  }

  loadAllSnippets() {
    this.dbService.getAllSnippet().then((data: any) => {
      this.items = data;
    });
  }

  searchItems(event: Event) {
    console.log('seachItems is fired');
    console.log('this.saerchTerm : ', this.searchTerm);
    event.preventDefault(); // Prevent the default form submission behavior
    this.dbService.searchSnippets(this.searchTerm).then((data: any) => {
      this.items = data;
    });
  }

  trackById(index: number, item: any) {
    return item.id; // Track by item id
  }
}
