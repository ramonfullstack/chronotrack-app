import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmAnticipationComponent } from './confirm-anticipation/confirm-anticipation.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { LoginRoutingModule } from '../login/login-routing.module';
import { ConfirmAnticipationRoutingModule } from './confirm-anticipation-routing.module';



@NgModule({
  declarations: [ConfirmAnticipationComponent],
  imports: [
    CommonModule,
    ConfirmAnticipationRoutingModule,
    MatCardModule,
    MatDividerModule,
    MatProgressBarModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class ConfirmAnticipationModule { }
