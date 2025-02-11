import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable, tap } from 'rxjs';
import { ExtraHours } from './model/ExtrahoursModel';



@Injectable({
  providedIn: 'root',
})
export class GeneratorService {
  constructor(private http: HttpClient) {
    console.log('iniciado generator.');
  }

  getHoursByUser(idUser: number): Observable<ExtraHours[]> {
    return this.http.get<ExtraHours[]>(
      `${environment.apiUrl}/extrahours/getHoursWorkedByUser/${idUser}`
    );
  }

  downloadSalesReport(idUser: number): Observable<Blob> {
    return this.http.get(`${environment.apiUrl}/extrahours/exportexcel/${idUser}`, {
      responseType: 'blob',
    }).pipe(
      tap((blob: Blob) => {
        const a = document.createElement('a');
        const url = window.URL.createObjectURL(blob);
        a.href = url;
        a.download = 'sales_report.xlsx';
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      })
    );
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

}
