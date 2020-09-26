import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class QueueService {

  constructor() { }

  videos = [];

  public addVideoToQueue(video) {
    this.videos.push(video);
  }

  public getVideos() {
    return this.videos;
  }

}
