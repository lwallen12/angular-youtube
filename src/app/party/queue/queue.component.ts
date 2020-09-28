import { Component, OnInit, ViewChild } from '@angular/core';
import { YouTubePlayer } from '@angular/youtube-player';
import { QueueService } from '../search/queue.service';

@Component({
  selector: 'app-queue',
  templateUrl: './queue.component.html',
  styleUrls: ['./queue.component.css']
})
export class QueueComponent implements OnInit {

  @ViewChild(YouTubePlayer) youtubePlayer!: YouTubePlayer;

  newVids = [];
  selectedVid = '';

  playStatus = 'waiting';

  constructor(private queueService: QueueService) {  
    this.newVids = this.queueService.getVideos();
    console.log(this.newVids);
   }

  refresh() {
    this.newVids = this.queueService.getVideos();
    console.log(this.queueService.getVideos());
  }

  ngOnInit(): void {
    // This code loads the IFrame Player API code asynchronously, according to the instructions at
    // https://developers.google.com/youtube/iframe_api_reference#Getting_Started
    const tag = document.createElement('script');

    tag.src = "https://www.youtube.com/iframe_api";
    document.body.appendChild(tag);
  }

  startItUp() {

    if (!this.newVids.length) {
      console.log("You need at least one video before startng the queue");
      return;
    }

    this.playStatus = 'playing';
    this.selectedVid = this.findHighestVotedVideo().id.videoId;
  }

  onReady(event) {
    console.log("ready");
    console.log(event);
    //this.youtubePlayer.playVideo();
    console.log("see new Vids");
    console.log(this.newVids);
    //this.youtubePlayer.mute();
    this.youtubePlayer.playVideo();
  }

  onStateChange(event) {
    if (this.newVids.length < 1) {
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
        this.selectedVid = this.findHighestVotedVideo().id.videoId;

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

    console.log(highestObj);

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
