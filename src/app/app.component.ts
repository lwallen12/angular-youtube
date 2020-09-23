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
  selectedVid = '';

  playStatus = 'waiting';
  

  constructor() {

    this.newVids = [
      {id: "J3aA1X2tnQc", description: "Old Timey Baseball", vote: 0},
      {id: 'T1di02CaDSQ', description: 'Rizzo and Swan', vote: 0},
      {id: 'nyyXkA2j9YI', description: 'Rally Squirrel', vote: 0}, 
      {id: 'KT7F15T9VBI', description: 'Heat Waves', vote: 0}, 
      {id: 'SaW5B2SEnXg', description: 'Tatis hits a grandslam', vote: 0}, 
      {id: 'JlbMDgUqgow', description: 'Padres arrre terrible baserunners', vote: 0}
    ];

    //just so i can actually listen to music while i code

  }

  ngOnInit() {
    // This code loads the IFrame Player API code asynchronously, according to the instructions at
    // https://developers.google.com/youtube/iframe_api_reference#Getting_Started
    const tag = document.createElement('script');

    tag.src = "https://www.youtube.com/iframe_api";
    document.body.appendChild(tag);

    
  }

  // counter = 0;

  startItUp() {
    this.playStatus = 'playing';
    this.selectedVid = this.findHighestVotedVideo().id;
  }

  onReady(event) {
    console.log("ready");
    console.log(event);
    //this.youtubePlayer.playVideo();
    console.log("see new Vids");
    console.log(this.newVids);
    this.youtubePlayer.mute();
    this.youtubePlayer.playVideo();
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


  /////////////////////////////

  upVote(vid) {

    // if (!this.selectedVid) {
    //   this.selectedVid = vid.id;
    // }

    let index = this.newVids.findIndex(v => v.id === vid.id);

    this.newVids[index].vote = this.newVids[index].vote + 1;

    // console.log("are you even upvoting?: " + this.newVids[index].vote);
  }
  
  downVote(vid) {
    let index = this.newVids.findIndex(v => v.id === vid.id);
    this.newVids[index].vote = this.newVids[index].vote - 1;
    // console.log("are you even downvoting?: " + this.newVids[index].vote);
  }

}
