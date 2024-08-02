import { Injectable } from '@angular/core';
import { CATEGORIES } from '../../assets/data/categories';
import { WORDS } from '../../assets/data/words';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  noPersonaSelected: number = 0;
  wordsSelected: any[] = [];

  constructor() { }


}
