import { Injectable } from '@angular/core';
import * as signalR from "@aspnet/signalr";
import { Subject } from 'rxjs/internal/Subject';
import { VotePackage } from './models/votePackage';
import { QueueService } from './parties/party/search/queue.service';

@Injectable({
  providedIn: 'root'
})
export class SignalrService {

  constructor(private queueService: QueueService) { }

  private hubConnection: signalR.HubConnection; 

  private voteSource = new Subject<VotePackage>();

  voteStream$ = this.voteSource.asObservable();
  
   //can be used to receive a queue
   public addBroadCastListener = () => {
    this.hubConnection.on('BroadCast', (data) => {
      console.log("received a video");
      this.queueService.addVideoToQueue(data);
      console.log(data);
      return data;
    });
  }

  

  public addVoteListener = () => {
    this.hubConnection.on('newvote', (data) => {
      console.log("receiving vote transmission... bee boo boo bop");
      console.log(data);
      //this.queueService.updateVotes(data);
      this.voteSource.next(data);
      return data;
    });
  }

  public BroadcastFromClient = () => {
    this.hubConnection.invoke("BroadcastFromClient", {id: "none"});
  }

  //invoked when choosing the group to load
  //no db actions
  public joinGroup = (groupName) => {
    this.hubConnection.invoke("JoinParty",
      groupName);
  }

  //invoked when adding a video to q,
  //only carries out when adding row to db is successful
  public broadcastQueue = (any) => {
    this.hubConnection.invoke("AddToQueue",
      any);
  }

  public vote = (any) => {
    this.hubConnection.invoke("Vote", any);

  }

  public startConnection = () => {
    this.hubConnection = new signalR.HubConnectionBuilder()
                            .withUrl('https://localhost:44393/hubs/party')
                            .build();
    this.hubConnection
      .start()
      .then(() => console.log('Connection started'))
      .catch(err => console.log('Error while starting connection: ' + err))      
  }

 

}
