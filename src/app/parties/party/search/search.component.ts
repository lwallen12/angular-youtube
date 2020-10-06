import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Queue } from 'src/app/models/queue';
import { SignalrService } from 'src/app/signalr.service';
import { QueueService } from './queue.service';
import { YoutubeService } from './youtube.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  constructor(private youtubeService: YoutubeService, 
              private queueService: QueueService,
              private signalRService: SignalrService,
              private router: Router) { }

  queryResults = [];
  sub: any;

  partyName: string;

  ngOnInit(): void {
    
    console.log(this.router.url);
    this.partyName = this.router.url.split('/')[2];
    console.log(this.partyName);

  }

  onSearch(value) {
    this.youtubeService.getSearchResults(value).subscribe(
      data => {
        console.log(data);
        this.queryResults = data.items;
      }, error => {
        console.log(error);
      }
    );
  }

  onAddVideo(searchItem) {
      searchItem.vote = 0;
      

      let queue = new Queue();

      queue.channelTitle = searchItem.channelTitle;
      queue.description = searchItem.snippet.description;
      queue.imageURL = searchItem.snippet.thumbnails.high.url;
      queue.partyName = this.partyName;
      queue.title = searchItem.snippet.title;
      queue.videoId = searchItem.id.videoId;
      queue.vote = 0;

      //this.queueService.addVideoToQueue(queue);

      this.signalRService.broadcastQueue(queue);
      this.queryResults.splice(
        this.queryResults.findIndex(qr => qr.id.videoId === searchItem.id.videoId), 
          1);
  }


}
