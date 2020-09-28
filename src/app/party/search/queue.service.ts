import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class QueueService {

  constructor() { }

  videos = [];

  addVideoToQueue(video) {
    this.videos.push(video);
    console.log(this.videos.length);
  }

  getVideos() {
    console.log(this.videos.length);
    return this.videos;
  }

}
