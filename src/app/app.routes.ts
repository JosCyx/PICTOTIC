import { Routes } from '@angular/router';
import { MainComponent } from './components/main/main.component';
import { LoginComponent } from './components/template/login/login.component';
import { SettingsContainerComponent } from './components/main/settings-container/settings-container.component';
import { WordsContainerComponent } from './components/main/words-container/words-container.component';

export const routes: Routes = [
    {path: '', redirectTo: 'main', pathMatch: 'full'},
    {path: '**', redirectTo: 'main', pathMatch: 'full'},
    {path: 'login', component: LoginComponent},
    {path: 'main', component: MainComponent,
        children: [
            {path: 'settings', component: SettingsContainerComponent},
            {path: 'words', component: WordsContainerComponent},
            {path: '', redirectTo: 'words', pathMatch: 'full'}
        ]
    }
];
