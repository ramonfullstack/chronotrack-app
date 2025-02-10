import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import GetStatementRequest from './model/GetStatementRequest';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GeneratorService {
  constructor(private http: HttpClient) {}

  getStatement(request: GetStatementRequest) {
    return this.http.get(
      `${
        environment.apiUrl
      }/receivable/user/transaction/anticipation/company/${this.buildQueryString(
        request
      )}`
    );
  }

  ExportScheduleToExcel(request: GetStatementRequest): Observable<Blob> {
    return this.http.get(
      `${environment.apiUrl}/receivable/excel/statements/exportexcel${this.buildQueryString(request)}`,
      { responseType: 'blob' } // Importante para arquivos
    );
  }

  getAnticipationDetail(idAnticipation:number) {
    return this.http.get(`${environment.apiUrl}/receivable/anticipation/detail/${idAnticipation}`) 
  }

  getSignature(idOperacao: string | null) {
    return this.http.get(`${environment.apiUrl}/receivable/anticipation/status/document/${idOperacao}`) 
  }

  getAnticipationDocuments(idAnticipation:number, type: string) {
    return this.http.get(`${environment.apiUrl}/receivable/user/download/document/anticipation/${type}/${idAnticipation}`) 
  }

  buildQueryString(params: any): string {
    if (!params) return '';

    const qs =
      '?' +
      Object.keys(params)
        .map((key) => `${key}=${params[key]}`)
        .join('&');

    return qs;
  }

  postConfirmCreate(idAnticipation:number) {
    return this.http.post(`${environment.apiUrl}/receivable/anticipation/confirm/create/${idAnticipation}`, null) 
  }

}
