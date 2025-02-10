import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import GetStatementRequest from '../model/GetStatementRequest';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { DialogOperationDetailsService } from '../dialog-operation-details/dialog-operation-details.service';
import { ActivatedRoute } from '@angular/router';
import { UtilsService } from '@shared/services/utils.service';
import { LoginService } from 'src/app/modules/login/login.service';
import { CookieStorage } from '@core/storages/CookieStorage.services';
import { DialogOperationDocumentsService } from '../dialog-operation-documents/dialog-operation-documents.service';
import * as moment from 'moment';
import { GeneratorService } from '../generator.service';

@Component({
  selector: 'app-statement',
  templateUrl: './generator.component.html',
  styleUrls: ['./generator.component.scss'],
})
export class GeneratorComponent implements AfterViewInit {

  displayedColumns: string[] = [
    'idAnticipation',
    'cnpj',
    'companyName',
    'date',
    'operationValue',
    'status',
    'action',
  ];
  dataSource!: MatTableDataSource<any>;

  filters = new GetStatementRequest();
  count: number = 0;
  inputStartDate: Date;
  inputEndDate: Date;
  minStartDate: Date;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
diaSemana: any;
horasTrabalhadas: any;
percentualDia: any;
valorHora: any;
total: any;

  constructor(
    private service: GeneratorService,
    private _dialogService: DialogOperationDetailsService,
    private _dialogDocumentsService: DialogOperationDocumentsService,
    private route: ActivatedRoute,
    private utilsService: UtilsService,
    private _loginService: LoginService,
    private _cookieService: CookieStorage
  ) {
    this.startMinDateValue();
  }

  private startMinDateValue() {
    const today = new Date();
    const nextThreeDays = new Date(today.setDate(today.getDate() + 3));
    this.minStartDate = nextThreeDays;
  }

  ngAfterViewInit(): void {
    this.route.params.subscribe((params) => {
      this.filters.Cnpj = params['cnpj'] || '';
    });

    //this.updateUserList();
    this.handleRefreshToken();
  }

  openDialogOperationDocuments(
    idAnticipation: number,
    status: string,
    hasAnexo: number,
    hasCessaoUr: number
  ) {


    this._dialogDocumentsService
      .openDocumentsDialog({
        idAnticipation,
        hasAnexo,
        hasCessaoUr,
      })
      .subscribe();
  }

  validateFilters(): GetStatementRequest {
    let request = new GetStatementRequest();
    if (this.filters.Cnpj) request.Cnpj = this.filters.Cnpj;
    if (this.filters.companyName)
      request.companyName = this.filters.companyName;

    if(this.inputStartDate)
      request.startDate = this.inputStartDate.toISOString().slice(0, 10);
    if(this.inputEndDate)
      request.endDate = this.inputEndDate.toISOString().slice(0, 10);
    if(this.filters.status)
      request.status = this.filters.status;
    
    
    request.pgNumber = this.paginator.pageIndex + 1;
    request.pgSize = this.paginator.pageSize;

    return request;
  }

   inputPeriodPreset(mes: number) {
    this.inputStartDate = moment().add(3, 'days').toDate();
    this.inputEndDate = moment().add(mes, 'months').toDate();
  }

  // updateFilters() {
  //   this.paginator.firstPage();
  //   this.updateUserList();
  // }

  handleRefreshToken(): void {
    this._loginService.refreshToken().subscribe({
      next: (response: any) => {
        this._cookieService.SetTokenOnCookies(response.accessToken);
      },
    });
  }

  exportarPraCsv() {
    throw new Error('Method not implemented.');
  }
  AddCalculo() {
    throw new Error('Method not implemented.');
  }

  // exportarPraCsv() {
  //   console.log("Exportando excel");
  //   let request = this.validateFilters();
  //   this.service.ExportScheduleToExcel(request).subscribe({
  //     next: (response) => {
  //       const blob = new Blob([response], { type: 'text/csv' });
  //       const url = window.URL.createObjectURL(blob);
  //       const a = document.createElement('a');
  //       a.href = url;
  //       a.download = `Statements_${new Date().toISOString()}.csv`; // Agora CSV de verdade
  //       document.body.appendChild(a);
  //       a.click();
  //       document.body.removeChild(a);
  //       window.URL.revokeObjectURL(url);
  //     },
  //     error: (err) => {
  //       console.error('Erro ao exportar CSV:', err);
  //     }
  //   });
  // }
  
}
