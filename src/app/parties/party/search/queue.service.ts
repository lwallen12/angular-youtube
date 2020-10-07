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
    this.videos.push(queue);
    console.log(this.videos.length);
    //console.log(queue);
  }

  getPartyVideos(partyName: string): Observable<Queue[]>{
   return this.http.get<Queue[]>(this.baseURL + '/videos/' + partyName);
  }

  testCall(): Observable<any> {
    return this.http.get<any>(this.baseURL);
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
