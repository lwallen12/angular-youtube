import { Component, ViewChild } from '@angular/core';
import { SignalrService } from './signalr.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  {
  title = 'angular-youtube';
  
  constructor(private signalrService: SignalrService) {

     //just so i can actually listen to music while i code

  }

  ngOnInit() {
    this.signalrService.startConnection();
    this.signalrService.addBroadCastListener();
  }

 

}
