import { Component } from '@angular/core';
import { NgZone } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatSliderModule} from '@angular/material/slider';
import {MatInputModule} from '@angular/material/input';
import { TextToSpeechService } from '../../../services/text-to-speech.service';


@Component({
  selector: 'app-player',
  standalone: true,
  imports: [
    FormsModule, 
    MatButtonModule, 
    MatIconModule,
    MatDividerModule, 
    MatSelectModule, 
    MatFormFieldModule, 
    MatSliderModule, 
    MatInputModule
  ],
  templateUrl: './player.component.html',
  styleUrl: './player.component.css'
})
export class PlayerComponent {
  textToSpeech: string = '';

  //almacena los datos de la voz seleccionada
  voice: any = {
    index: 4,
    pitch: 1,
    rate: 0.65,
    volume: 1
  }

  //almacena la lista de voces predeterminadas
  voices: SpeechSynthesisVoice[] = [];

  //variables para controlar los botones
  isReading: boolean = false;
  isStoped: boolean = false;

  //lista = ['yo', 'quiero', 'comer', 'pizza', 'hoy', 'por', 'la', 'noche', 'con', 'mi', 'familia'];

  constructor(
    private ngZone: NgZone, 
    private ttsService: TextToSpeechService
  ) { }

  ngOnInit() {
    speechSynthesis.addEventListener('voiceschanged', () => {
      this.voices = speechSynthesis.getVoices();
    });
  }

  startSpeaking() {
    try {
      //si esta vacio el campo de texto, se leera la lista de palabras
      if(this.textToSpeech == ''){

        this.ttsService.textToSpeech.forEach((element) => {
          this.textToSpeech += element + ' '
        })
      }      

      console.log('let´s to speech!!!')
      const index = this.voice.index;
      const message = new SpeechSynthesisUtterance(this.textToSpeech);
      message.voice = this.voices[index];
      message.pitch = this.voice.pitch;
      message.rate = this.voice.rate;
      message.volume = this.voice.volume;
      window.speechSynthesis.speak(message);
      this.isReading = true;

      //cuando termine de leer habilitar el boton de leer
      message.onend = () => {
        console.log('end speech')
        this.ngZone.run(() => {
          this.isReading = false;
          //console.log(this.isReading)
        });
      }
    }
    catch (error) {
      console.log(error)
    }
  }

  handlePlaySpeaking(action: number) {
    if (action === 1) {
      window.speechSynthesis.pause();
      this.isStoped = true;
    } else if (action === 2) {
      window.speechSynthesis.resume();
      this.isStoped = false;
    } else if (action === 3) {
      window.speechSynthesis.cancel();
      this.isReading = false;
      this.isStoped = false;
    }
  }
}
