import { DbService } from './../../services/db.service';
import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Snippet } from '../../models/snippet';

@Component({
  selector: 'app-create-bin',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './create-bin.component.html',
  styleUrl: './create-bin.component.css',
})
export class CreateBinComponent {
  constructor(private dbService: DbService) {}
  title = new FormControl('', [Validators.required]);
  author = new FormControl('', [Validators.required]);
  hashtags = new FormControl('', [Validators.required]);
  code = new FormControl('', [Validators.required]);

  hashtagsMaker(inputString: any): any[] {
    if (inputString.length == 0) {
      return [];
    }
    let items: string[] = inputString
      .split(',')
      .map((item: string) => item.trim());
    let hashtags: string[] = items.map((item: string) => '#' + item);
    return hashtags;
  }

  // Subscribe to valueChanges to update formattedHashtags when hashtags value changes
  formattedHashtags: string[] = [];

  ngOnInit() {
    this.hashtags.valueChanges.subscribe((value) => {
      this.formattedHashtags = this.hashtagsMaker(value || ''); // Use empty string if value is null
    });
  }

  binForm = new FormGroup({
    title: this.title,
    author: this.author,
    hashtags: this.hashtags,
    code: this.code,
  });

  async save() {
    const authorValue: string = this.author.value || ''; // Use empty string as default if value is null
    const titleValue: string = this.title.value || ''; // Use empty string as default if value is null
    const hashtagsValue: string[] | null | undefined =
      this.formattedHashtags || null; // Adjust as per your requirement
    const codeValue: string = this.code.value || ''; // Use empty string as default if value is null

    // Create Snippet object with non-nullable values
    const snippet: Snippet = {
      title: titleValue,
      author: authorValue,
      hashtags: hashtagsValue,
      code: codeValue,
    };
    this.dbService.createSnippet(snippet);
  }
}
