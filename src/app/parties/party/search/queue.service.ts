import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class QueueService {

  constructor(private http: HttpClient) { }

  baseURL = 'https://localhost:44393/api/values';

  videos = [];

  addVideoToQueue(video) {
    this.videos.push(video);
    console.log(this.videos.length);
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
