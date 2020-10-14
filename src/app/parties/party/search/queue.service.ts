import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Queue } from 'src/app/models/queue';
import { VotePackage } from 'src/app/models/votePackage';


@Injectable({
  providedIn: 'root'
})
export class QueueService {

  constructor(private http: HttpClient) { }

  baseURL = 'https://localhost:44393/api/values';

  videos = [];

  addVideoToQueue(queue) {
    //this.videos.push(queue);
    console.log(this.videos.length);
    //console.log(queue);
  }

  updateVotes(votePackage: VotePackage) {
    this.getPartyVideos(votePackage.partyName).subscribe(
      data => {
        let vidInQuestion = data.find(x => x.videoId = votePackage.videoId);

    if (votePackage.action === 'Up') {
      vidInQuestion.vote = vidInQuestion.vote + 1;
    } else {
      vidInQuestion.vote = vidInQuestion.vote - 1;
    }
      }
    );
    
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
