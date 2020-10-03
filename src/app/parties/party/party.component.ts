import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-party',
  templateUrl: './party.component.html',
  styleUrls: ['./party.component.css']
})
export class PartyComponent implements OnInit, OnDestroy {

  sub: any;
  partyName: string;

  constructor() {
    
   }

  ngOnInit(): void {

  }

  ngOnDestroy() {

  }
  

}
