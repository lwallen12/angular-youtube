import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Queue } from 'src/app/models/queue';


@Injectable({
  providedIn: 'root'
})
export class QueueService {

  constructor(private http: HttpClient) { }

  baseURL = 'https://localhost:44393/api/values';

  videos = [];

  addVideoToQueue(queue) {
    // this.videos.push(video);

    // let queue = new Queue();

    // queue.channelTitle = video.channelTitle;
    // queue.description = video.snippet.description;
    // queue.imageURL = video.snippet.thumbnails.high.url;
    // queue.partyName = video.partyName;
    // queue.title = video.snippet.title;
    // queue.videoId = video.id.videoId;
    // queue.vote = 0;

    this.videos.push(queue);
    console.log(this.videos.length);
    //console.log(queue);
  }

  getVideos() {
    console.log(this.videos.length);
    return this.videos;
  }

  getParties(user: string): Observable<string[]> {
    console.log(this.baseURL + '/' + user);
    return this.http.get<string[]>(this.baseURL + '/' + user);
  }

  //loads videos added previous to this connection being live
  getPastVideos() {}

}
