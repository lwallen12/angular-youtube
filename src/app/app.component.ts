import { AfterContentChecked, AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { YouTubePlayer } from '@angular/youtube-player';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  {
  title = 'angular-youtube';

  @ViewChild(YouTubePlayer) youtubePlayer!: YouTubePlayer;

  selectedVid = 'SaW5B2SEnXg';

  //vids = ["J3aA1X2tnQc", 'T1di02CaDSQ', 'nyyXkA2j9YI', 'KT7F15T9VBI', 'SaW5B2SEnXg', 'JlbMDgUqgow'];

  newVids = [
    {id: "J3aA1X2tnQc", description: "Old Timey Baseball", vote: 13},
    {id: 'T1di02CaDSQ', description: 'Rizzo and Swan', vote: 6},
    {id: 'nyyXkA2j9YI', description: 'Rally Squirrel', vote: 18}, 
    {id: 'KT7F15T9VBI', description: 'Heat Waves', vote: 12}, 
    {id: 'SaW5B2SEnXg', description: 'Tatis hits a grandslam', vote: 5}, 
    {id: 'JlbMDgUqgow', description: 'Padres arrre terrible baserunners', vote: 0}
  ]

  ngOnInit() {
    // This code loads the IFrame Player API code asynchronously, according to the instructions at
    // https://developers.google.com/youtube/iframe_api_reference#Getting_Started
    const tag = document.createElement('script');

    tag.src = "https://www.youtube.com/iframe_api";
    document.body.appendChild(tag);
  }

  counter = 0;

  onReady(event) {
    console.log(event);
  }

  onStateChange(event) {
    console.log(event);
    if (event.data === 0) {
      this.removeHighestVid();
      this.selectedVid = this.findHighestVid().id;
    }
    if (event.data === 5) {
      //probably want some sort of animation
      //setTimeout(() => console.log("wait a couple"), 10000);
      this.youtubePlayer.playVideo();
      // this.moveNext();
    }
  }

  // moveNext() {
  //   if (this.vids[this.counter + 1]) {
  //     this.counter = this.counter + 1;
  //     this.selectedVid = this.vids[this.counter];
  //     this.youtubePlayer.playVideo();
  //   }
  // }

  startTheQueue() {
    this.selectedVid = this.findHighestVid().id;
    this.youtubePlayer.playVideo();
  }

  removeHighestVid() {
    let currentVid = this.findHighestVid().id;
    let index = this.newVids.findIndex(vid => vid.id === currentVid);

    this.newVids.splice(index);
  }

  findHighestVid() {
    //console.log("id should be nyyXkA2j9YI");
    // console.log(currentId);

    let votes = this.newVids.map(vid => vid.vote);
    let max = Math.max(...votes);

    let maxVoted = this.newVids.find(vid => vid.vote === max);
    console.log(maxVoted);

    return maxVoted;
  }

  // nextVideo() {
  //   this.moveNext();
  // }

}
