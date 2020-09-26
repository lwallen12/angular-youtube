import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { YouTubePlayerModule } from "@angular/youtube-player";
import { SearchComponent } from './party/search/search.component';
import { PartyComponent } from './party/party.component';
import { QueueComponent } from './party/queue/queue.component';

@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    PartyComponent,
    QueueComponent
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
