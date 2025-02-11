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

  saveHourInDatabase(extraHours: ExtraHours): Observable<ExtraHours> {
    return this.http.post<ExtraHours>(
      `${environment.apiUrl}/extrahours/saveHour`, 
      extraHours
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

  getFictitiousData(): ExtraHours[] {
    const data: ExtraHours[] = [];
    
    // Gerando 10 dados fictícios
    for (let i = 0; i < 10; i++) {
      const fictitiousData: ExtraHours = {
        id: i + 1,
        idUser: Math.floor(Math.random() * 10) + 1,
        hoursWorked: Math.floor(Math.random() * 10) + 1,
        baseRateDay: Math.floor(Math.random() * 100) + 1,
        valueHourBase: Math.floor(Math.random() * 100) + 10,
        totalValueEarnedDay: 0,
        dayOfWeek: this.getRandomDayOfWeek(),
        created: new Date(),
        updated: new Date(),
      };

      // Calculando o valor total ganho no dia
      fictitiousData.totalValueEarnedDay =
        (fictitiousData.hoursWorked || 0) *
        (fictitiousData.valueHourBase || 0) *
        (fictitiousData.baseRateDay || 100) / 100;

      data.push(fictitiousData);
    }

    return data;
  }

  private getRandomDayOfWeek(): string {
    const days = ['Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado', 'Domingo'];
    const randomIndex = Math.floor(Math.random() * days.length);
    return days[randomIndex];
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
