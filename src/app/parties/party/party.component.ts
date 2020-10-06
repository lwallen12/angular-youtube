import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { QueueService } from './search/queue.service';

@Component({
  selector: 'app-party',
  templateUrl: './party.component.html',
  styleUrls: ['./party.component.css']
})
export class PartyComponent implements OnInit, OnDestroy {

  sub: any;
  partyName: string;

  constructor(private router: Router, private queueService: QueueService) {
    
   }

  ngOnInit(): void {
    
  }

  ngOnDestroy() {

  }
  

}
