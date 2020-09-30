import { Injectable } from '@angular/core';
import * as signalR from "@aspnet/signalr";

@Injectable({
  providedIn: 'root'
})
export class SignalrService {

  constructor() { }

  private hubConnection: signalR.HubConnection;  

  public startConnection = () => {
    this.hubConnection = new signalR.HubConnectionBuilder()
                            .withUrl('https://localhost:44393/hubs/party')
                            .build();
    this.hubConnection
      .start()
      .then(() => console.log('Connection started'))
      .catch(err => console.log('Error while starting connection: ' + err))      
  }

  //can be used to receive a queue
  public addBroadCastListener = () => {
    this.hubConnection.on('BroadCast', (data) => {
      console.log(data);
      return data;
    });
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

}
