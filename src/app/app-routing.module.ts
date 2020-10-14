import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PartiesComponent } from './parties/parties.component';
import { PartyComponent } from './parties/party/party.component';
import { QueueComponent } from './parties/party/queue/queue.component';
import { SearchComponent } from './parties/party/search/search.component';

const routes: Routes = [
  {path: '', redirectTo: 'party', pathMatch: 'full'},
  {path: 'party', component: PartiesComponent},
  {path: 'party/:name', component: PartyComponent,
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
