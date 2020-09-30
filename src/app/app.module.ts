import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { YouTubePlayerModule } from "@angular/youtube-player";
import { SearchComponent } from './parties/party/search/search.component';
import { PartyComponent } from './parties/party/party.component';
import { QueueComponent } from './parties/party/queue/queue.component';
import { PartiesComponent } from './parties/parties.component';

@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    PartyComponent,
    QueueComponent,
    PartiesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    YouTubePlayerModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
