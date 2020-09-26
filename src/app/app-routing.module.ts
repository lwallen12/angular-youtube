import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PartyComponent } from './party/party.component';
import { QueueComponent } from './party/queue/queue.component';
import { SearchComponent } from './party/search/search.component';

const routes: Routes = [
  {path: '', redirectTo: 'party', pathMatch: 'full'},
  {path: 'party', component: PartyComponent,
          children: [
            //{path: '', redirectTo: 'queue', pathMatch: 'full'},
            {path: 'queue', component: QueueComponent},
            {path: 'addvideo', component: SearchComponent}
          ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
