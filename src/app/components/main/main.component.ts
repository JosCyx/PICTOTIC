import { Component } from '@angular/core';
import { HeaderComponent } from '../template/header/header.component';
import { MenuComponent } from '../template/menu/menu.component';
import { WordsContainerComponent } from './words-container/words-container.component';
import { SettingsContainerComponent } from './settings-container/settings-container.component';
import { PlayerComponent } from '../template/player/player.component';
import { RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [HeaderComponent, MenuComponent, WordsContainerComponent, SettingsContainerComponent, PlayerComponent, RouterOutlet],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {

}
