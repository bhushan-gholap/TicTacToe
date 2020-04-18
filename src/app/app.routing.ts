import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import {GameComponent} from './game/game.component';
import {PlayComponent} from './play/play.component';
import {ContactUsComponent} from './contact-us/contact-us.component';

const AppRoutes: Routes = [
    // { path: '', component: AppComponent , pathMatch: 'full'},
    { path: 'game', component: GameComponent , 
    children: [{ path: 'play/:id/:mode', component: PlayComponent }]},
  { path: 'contact-us', component: ContactUsComponent}
];

export const routing: ModuleWithProviders = RouterModule.forRoot(AppRoutes, {onSameUrlNavigation: 'reload'});