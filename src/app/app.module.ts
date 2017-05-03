import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {MdButtonModule, MdToolbarModule, MdInputModule, 
        MdCardModule, MdProgressSpinnerModule} from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';

import { AppComponent } from './app.component';
import { CardComponent } from './card/card.component';

import { YoutubeService, youtubeSearchServiceInjectables } from './services/youtube.service';
@NgModule({
  declarations: [
    AppComponent,
    CardComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    NoopAnimationsModule,
    FlexLayoutModule,
    MdButtonModule, MdToolbarModule, MdInputModule,
    MdCardModule, MdProgressSpinnerModule
  ],
  providers: [YoutubeService, youtubeSearchServiceInjectables],
  bootstrap: [AppComponent]
})
export class AppModule { }
