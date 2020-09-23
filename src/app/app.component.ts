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

  

  //vids = ["J3aA1X2tnQc", 'T1di02CaDSQ', 'nyyXkA2j9YI', 'KT7F15T9VBI', 'SaW5B2SEnXg', 'JlbMDgUqgow'];

  newVids = [];
  selectedVid = 'SaW5B2SEnXg';
  

  constructor() {

    this.newVids = [
      {id: "J3aA1X2tnQc", description: "Old Timey Baseball", vote: 18},
      {id: 'T1di02CaDSQ', description: 'Rizzo and Swan', vote: 6},
      {id: 'nyyXkA2j9YI', description: 'Rally Squirrel', vote: 18}, 
      {id: 'KT7F15T9VBI', description: 'Heat Waves', vote: 12}, 
      {id: 'SaW5B2SEnXg', description: 'Tatis hits a grandslam', vote: 5}, 
      {id: 'JlbMDgUqgow', description: 'Padres arrre terrible baserunners', vote: 0}
    ];

    //this.selectedVid = //findHighestValue
  }

  ngOnInit() {
    // This code loads the IFrame Player API code asynchronously, according to the instructions at
    // https://developers.google.com/youtube/iframe_api_reference#Getting_Started
    const tag = document.createElement('script');

    tag.src = "https://www.youtube.com/iframe_api";
    document.body.appendChild(tag);

    
  }

  counter = 0;

  onReady(event) {
    console.log("ready");
    console.log(event);
    //this.youtubePlayer.playVideo();
    console.log("see new Vids");
    console.log(this.newVids);
  }

  onStateChange(event) {
    if (this.newVids.length <= 1) {
      //when there is one video left.. need to put some thought in to how to handle this..
      //we could set videos vote to 0
      //we could have some flag set that says... "okay last one is played.. can restart..".. kicking off 
      //other logic
      return;
    }
    console.log(event);
    if (event.data === 0) {

        //remove current video
        console.log("splicing"); 
        this.newVids.splice(this.newVids.findIndex(x => x.id === event.target.videoId), 1);
        console.log("see new Vids");
        console.log(this.newVids);

        console.log(this.findHighestVotedVideo());
        this.selectedVid = this.findHighestVotedVideo().id;

        console.log("ended"); 
    }
    if (event.data === 5) {
      //probably want some sort of animation
      //setTimeout(() => console.log("wait a couple"), 10000);
      console.log("cued");

        this.youtubePlayer.playVideo();
 
    }
  }


  findHighestVotedVideo() {
    let allVotes = this.newVids.map(vid => vid.vote);

    let highestObj = this.newVids.find(vid => vid.vote === Math.max(...allVotes));

    return highestObj;
  }
  

}
