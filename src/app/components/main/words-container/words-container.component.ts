import { Component } from '@angular/core';
import { CATEGORIES } from '../../../../assets/data/categories';
import { WORDS } from '../../../../assets/data/words';

import { MatCardModule } from '@angular/material/card'
import { MatButtonModule } from '@angular/material/button';
import { TextToSpeechService } from '../../../services/text-to-speech.service';
import { GlobalService } from '../../../services/global.service';

@Component({
  selector: 'app-words-container',
  standalone: true,
  imports: [MatCardModule, MatButtonModule],
  templateUrl: './words-container.component.html',
  styleUrl: './words-container.component.css'
})
export class WordsContainerComponent {

  isCategorySelected: boolean = false;

  //almacena la cateoria seleccionada por el usuario
  categorySelected: any = {};

  //almacena todas las categorias
  allCategories: any = CATEGORIES;

  //almacena todas las palabras de la categoria seleccionada
  wordsByCategory: any = [];

  constructor(
    private textToSpeechService: TextToSpeechService,
    private globalService: GlobalService
  ) { }

  selectCategory(category: any) {
    this.categorySelected = category;
    this.isCategorySelected = true;

    this.getWordsByCategory(category.id);
  }

  getWordsByCategory(categoryId: number) {

    //si la categoria es 4, extraer las palabras con idCategory = 4 y con noPerona = globalService.noPersonaSelected
    if (categoryId === 4) {
      this.wordsByCategory = WORDS.filter(word => word.categoryId === categoryId && word.noPerona === this.globalService.noPersonaSelected);

      //agregar el "dame" y el "dolor", buscar las palabras con id 34 y 35 y agregarlas a la lista
      const dame = WORDS.find(word => word.id === 34);
      const dolor = WORDS.find(word => word.id === 35);
      this.wordsByCategory.push(dame);
      this.wordsByCategory.push(dolor);
    } else {
      //filtrar las palabras por la categoria
      this.wordsByCategory = WORDS.filter(word => word.categoryId === categoryId);
    }

    //agregar la palabra atras
    const atras = { id: 0, word: 'Atrás', categoryId: 0, image: 'assets/img/backArrow.png' };
    this.wordsByCategory.push(atras);

    //ordenar las palabras segun el id
    this.wordsByCategory.sort((a: any, b: any) => a.id - b.id);
  }

  selectWord(word: any) {

    //si la categoria es 1, seleccionar el noPersona de la palabra y guardarlo en una variable global
    if (word.categoryId === 1) {
      this.globalService.noPersonaSelected = word.noPersona;
    }

    //console.log(word);
    //si el id de la palabra es 0, significa que el usuario selecciono la palabra atras
    if (word.id === 0) {
      this.backToCategories();
    } else {
      // Agregar la palabra a la lista de reproducción del textToSpeechService
      if (this.textToSpeechService.textToSpeech === '') {
        this.textToSpeechService.textToSpeech += word.word;
      } else {
        this.textToSpeechService.textToSpeech += ' ' + word.word;
        //console.log(this.textToSpeechService.textToSpeech);
      }
    }
  }

  backToCategories() {
    this.isCategorySelected = false;
    this.wordsByCategory = [];
  }

  speechOnce(text: string) {
    this.textToSpeechService.startSpeaking(text);
  }
}
