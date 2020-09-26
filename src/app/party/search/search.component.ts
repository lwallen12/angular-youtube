import { Component, OnInit } from '@angular/core';
import { QueueService } from './queue.service';
import { YoutubeService } from './youtube.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  constructor(private youtubeService: YoutubeService, private queueService: QueueService) { }

  queryResults = [];

  ngOnInit(): void {
    
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
      this.queueService.addVideoToQueue(searchItem);
  }


}
