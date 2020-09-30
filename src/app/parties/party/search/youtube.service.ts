import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { HttpParams } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class YoutubeService {

  constructor(private http: HttpClient) { }

  baseURL: string = 'https://content.googleapis.com/youtube/v3/search?';

  getSearchResults(input: string): Observable<any> {

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    let searchValue = input.split(' ').join('%20');

    // let params = new HttpParams();
    // params.append('q', searchValue);
    // params.append('part', 'snippet');
    // params.append('maxResult', '10');
    // params.append('type', 'video');
    // params.append('videoSyndicated', 'true');
    // params.append('videoLicense', 'youtube');
    // params.append('videoEmbeddable', 'true');
    // params.append('key', 'AIzaSyDLB-wFqFlG8OyuY9OaHESrV_FtSp34Ow4');

    // return this.http.get<any>(this.baseURL, {params: params});

    //https://content.googleapis.com/youtube/v3/search?q=Yuli%20Gurriel%20Game%205&part=snippet&maxResults=10&type=video&videoSyndicated=true&videoLicense=youtube&videoEmbeddable=true&key=AIzaSyDLB-wFqFlG8OyuY9OaHESrV_FtSp34Ow4

    let url = this.baseURL + 'q=' + searchValue + '&part=snippet&maxResults=10&type=video&videoSyndicated=true&videoLicense=youtube&videoEmbeddable=true&key=AIzaSyDLB-wFqFlG8OyuY9OaHESrV_FtSp34Ow4';

    return this.http.get<any>(url);
  }

  /*
https://content.googleapis.com/youtube/v3/search?
	q=Yuli%20Gurriel%20Game%205&
	part=snippet&
	maxResults=10&
	type=video&
	videoSyndicated=true&
	videoLicense=youtube&
	videoEmbeddable=true&
	key=AIzaSyDLB-wFqFlG8OyuY9OaHESrV_FtSp34Ow4  

*/
}
