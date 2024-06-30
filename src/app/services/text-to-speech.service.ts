import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class TextToSpeechService {

  textToSpeech: string = '';

  constructor() { }

  //almacena los datos de la voz seleccionada
  voice: any = {
    index: 4,
    pitch: 0.75,
    rate: 0.6,
    volume: 1
  }

  //almacena la lista de voces predeterminadas
  voices: SpeechSynthesisVoice[] = [];

  startSpeaking(text: string) {
    try {
      //si esta vacio el campo de texto, se leera la lista de palabras  
      console.log('let´s to speech!!!')
      const index = 4;
      const message = new SpeechSynthesisUtterance(text);
      message.voice = this.voices[index];
      message.pitch = this.voice.pitch;
      message.rate = this.voice.rate;
      message.volume = this.voice.volume;
      window.speechSynthesis.speak(message);

      //cuando termine de leer habilitar el boton de leer
      message.onend = () => {
        console.log('end speech');
      }
    }
    catch (error) {
      console.log(error)
    }
  }
  
}
