import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ConfirmAnticipationService {
  constructor(private http: HttpClient) {}

  postConfirmAnticipation(idAnticipation:number) : Observable<any>{
    return this.http.post(`${environment.apiUrl}/receivable/anticipationPublic/confirm/${idAnticipation}`, {});
  }
}
