import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TextToSpeechService {

  textToSpeech: string[]= ['yo', 'quiero', 'comer', 'pizza', 'hoy', 'por', 'la', 'noche', 'con', 'mi', 'familia'];

  constructor() { }
}
