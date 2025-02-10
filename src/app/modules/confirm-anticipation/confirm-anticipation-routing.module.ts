import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConfirmAnticipationComponent } from './confirm-anticipation/confirm-anticipation.component';

const routes: Routes = [
  {
    path: ':idAnticipation',
    component: ConfirmAnticipationComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConfirmAnticipationRoutingModule {}
