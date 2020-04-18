import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { routing } from './app.routing';
import { FormsModule }   from '@angular/forms';

import { AppComponent } from './app.component';
import { GameComponent } from './game/game.component';
import { PlayComponent } from './play/play.component';
import { ContactUsComponent } from './contact-us/contact-us.component';

@NgModule({
  declarations: [
    AppComponent,
    GameComponent,
    PlayComponent,
    ContactUsComponent
  ],
  imports: [
    BrowserModule,
    routing,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
