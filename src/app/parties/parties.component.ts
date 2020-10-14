import { Component, OnInit } from '@angular/core';
import { SignalrService } from '../signalr.service';
import { QueueService } from './party/search/queue.service';

@Component({
  selector: 'app-parties',
  templateUrl: './parties.component.html',
  styleUrls: ['./parties.component.css']
})
export class PartiesComponent implements OnInit {

  constructor(private queueService: QueueService, private signalRService: SignalrService) { }

  parties = [];

  ngOnInit(): void {
    //get all of the parties loaded for the userName that is inputted
  }

  onSignIn(user: string) {
    this.queueService.getParties(user).subscribe(
      data => {
        console.log(data);
        this.parties = data;
      }, error => {
        console.log(error);
      }
    )
  }

  addConnToGroup(p) {
    //TODO: Call group join method and pass it this group name
    this.signalRService.joinGroup(p);
  }

  broadCast() {
    this.signalRService.BroadcastFromClient();
  }

}
