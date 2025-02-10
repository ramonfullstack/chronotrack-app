import { Component, OnInit } from '@angular/core';
import { ConfirmAnticipationService } from '../confirm-anticipation.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-confirm-anticipation',
  templateUrl: './confirm-anticipation.component.html',
  styleUrls: ['./confirm-anticipation.component.scss']
})
export class ConfirmAnticipationComponent implements OnInit {

  constructor(private service:ConfirmAnticipationService, private route:ActivatedRoute) { }

  idAnticipation:number = 0;
  success:boolean = true;
  generateCard:boolean = false;

  ngOnInit(): void {
    let idAnticipationParams:string | null = "";
    this.route.paramMap.subscribe(params => {
      idAnticipationParams = params.get('idAnticipation');
    });

    if(idAnticipationParams === "" || idAnticipationParams === null){
      this.success = false;
      this.generateCard = true;
      return;
    }
    this.idAnticipation = parseInt(idAnticipationParams);
    this.service.postConfirmAnticipation(this.idAnticipation).subscribe((res) => {
      this.success = true;  
      this.generateCard = true;   
    }, (err) => {
      this.success = false;
      this.generateCard = true;
    });
  }
}
