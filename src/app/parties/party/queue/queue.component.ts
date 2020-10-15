import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { YouTubePlayer } from '@angular/youtube-player';
import { VotePackage } from 'src/app/models/votePackage';
import { SignalrService } from 'src/app/signalr.service';
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
  partyName = '';

  playStatus = 'waiting';

  constructor(private queueService: QueueService, 
              private router: Router, 
              private signalrService: SignalrService) {  
    
                signalrService.voteStream$.subscribe(
                  votePackage => {
                    let vidInQuestion = this.newVids.find(v => v.videoId === votePackage.videoId);

                    if (votePackage.action === 'Up') {
                      vidInQuestion.vote++;
                    } else {
                      vidInQuestion.vote--;
                    }
                  }
                );

                signalrService.queueItemStream$.subscribe(
                  queueItem => {
                    this.newVids.push(queueItem);
                  }
                );
   }

  

  ngOnInit(): void {
    // This code loads the IFrame Player API code asynchronously, according to the instructions at
    // https://developers.google.com/youtube/iframe_api_reference#Getting_Started
    const tag = document.createElement('script');

    tag.src = "https://www.youtube.com/iframe_api";
    document.body.appendChild(tag);

    console.log(this.router.url);
    this.partyName = this.router.url.split('/')[2];
    console.log(this.partyName);

    this.queueService.getPartyVideos(this.partyName).subscribe(
      data => {
        this.newVids = data;
      }, error => {
        console.log(error);
      }
    );
  }

  startItUp() {

    if (!this.newVids.length) {
      console.log("You need at least one video before startng the queue");
      return;
    }

    this.playStatus = 'playing';
    this.selectedVid = this.findHighestVotedVideo().videoId;
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
    console.log(event);
    if (event.data === 0) {

        //remove current video
        console.log("splicing"); 
        this.newVids.splice(this.newVids.findIndex(x => x.id.videoId === event.target.videoId), 1);
        console.log("see new Vids");
        console.log(this.newVids);

        if (this.newVids.length < 1) {
          //when there is one video left.. need to put some thought in to how to handle this..
          //we could set videos vote to 0
          //we could have some flag set that says... "okay last one is played.. can restart..".. kicking off 
          //other logic
          return;
        } 

        console.log(this.findHighestVotedVideo());
        this.selectedVid = this.findHighestVotedVideo().videoId;

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
    // let index = this.newVids.findIndex(v => v.videoId === vid.videoId);
    // this.newVids[index].vote = this.newVids[index].vote + 1;

    // this.queueService.testCall().subscribe(
    //   data => {
    //     console.log("AHHHHH calling the send all method in signalr");
    //     console.log(data);
    //   }
    // );

    //Need to call hub method 1st, then we're done here... but the affecting the queue thing
    //as a listener
    let votePackage = new VotePackage();
    votePackage.partyName = this.partyName;
    votePackage.videoId = vid.videoId;
    votePackage.action = "Up";

    console.log(votePackage);
    this.signalrService.vote(votePackage);
    
  }
  
  downVote(vid) {
    let votePackage = new VotePackage();
    votePackage.partyName = this.partyName;
    votePackage.videoId = vid.videoId;
    votePackage.action = "Down";

    console.log(votePackage);
    this.signalrService.vote(votePackage);
  }

}
