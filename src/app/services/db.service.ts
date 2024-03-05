import { Injectable } from '@angular/core';
import { getFirestore } from 'firebase/firestore';
import { collection, addDoc, getDocs, doc, getDoc } from 'firebase/firestore';
import { AuthService } from './auth.service';
import { Snippet } from '../models/snippet';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class DbService {
  private db?: any;
  constructor(private authService: AuthService, private router: Router) {
    this.db = getFirestore();
  }

  async createSnippet(snippet: Snippet) {
    try {
      const docRef = await addDoc(collection(this.db, 'snippets'), {
        ...snippet,
        by: this.authService.getUid(),
      });
      console.log('Document written with ID: ', docRef.id);
      alert('code snippet created');
      this.router.navigate(['/']);
    } catch (e) {
      console.error('Error adding document: ', e);
      alert('error while creating');
    }
  }

  async getAllSnippet() {
    let result: any[] = [];
    const querySnapshot = await getDocs(collection(this.db, 'snippets'));
    querySnapshot.forEach((doc) => {
      result.push({ id: doc.id, ...doc.data() });
    });
    return result;
  }

  async getSnippetById(docId: string) {
    const docRef = doc(this.db, 'snippets', docId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log('Document data:', docSnap.data());
      return docSnap.data();
    } else {
      // docSnap.data() will be undefined in this case
      return {
        id: '1',
        title: 'non found',
        code: 'not found',
      };
    }
  }

  async searchSnippets(searchTerm: string) {
    console.log('searchTerm:', searchTerm);
    let result: any[] = [];
    const querySnapshot = await getDocs(collection(this.db, 'snippets'));

    querySnapshot.forEach((doc) => {
      const data = doc.data();

      const matchesSearchTerm =
        !searchTerm ||
        data['title']?.toLowerCase()?.includes(searchTerm.toLowerCase()) ||
        data['author']?.toLowerCase()?.includes(searchTerm.toLowerCase()) ||
        data['hashtags']?.some((tag: string) =>
          tag.toLowerCase().includes(searchTerm.toLowerCase())
        );

      if (matchesSearchTerm) {
        result.push({ id: doc.id, ...data });
      }
    });

    return result;
  }
}
