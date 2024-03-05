import { Component } from '@angular/core';
import { DbService } from '../../services/db.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-view-snippet',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './view-snippet.component.html',
  styleUrl: './view-snippet.component.css',
})
export class ViewSnippetComponent {
  getRandomColor(): string {
    // Generate a random color in hexadecimal format
    return '#' + Math.floor(Math.random() * 16777215).toString(16);
  }
  codeSnippet = {
    title: '',
    author: '',
    code: '',
    hashtags: [],
  };
  constructor(private route: ActivatedRoute, private dbService: DbService) {}

  ngOnInit() {
    const docId = this.route.snapshot.paramMap.get('id');
    this.dbService.getSnippetById(docId!).then((data: any) => {
      this.codeSnippet = data;
    });
  }
}
