import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { GeneratorService } from '../generator.service';
import { ExtraHours } from '../model/ExtrahoursModel';

@Component({
  selector: 'app-statement',
  templateUrl: './generator.component.html',
  styleUrls: ['./generator.component.scss'],
})
export class GeneratorComponent implements AfterViewInit {
  displayedColumns: string[] = [
    'id',
    'idUser',
    'dayOfWeek',
    'hoursWorked',
    'totalValueEarnedDay',
    'created',
  ];
  dataSource!: MatTableDataSource<ExtraHours>;
  extraHours: ExtraHours = {
    id: 0,
    idUser: 0,
    hoursWorked: 0,
    baseRateDay: 0,
    valueHourBase: 0,
    totalValueEarnedDay: 0,
    dayOfWeek: '',
    created: new Date(),
    updated: new Date(),
  };

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private service: GeneratorService) {}

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnInit() {
    this.loadFictitiousData();
  }

  addCalculo() {
    this.extraHours.totalValueEarnedDay =
      (this.extraHours.hoursWorked || 0) *
      (this.extraHours.valueHourBase || 0) *
      (this.extraHours.baseRateDay || 100) / 100;

    // Aqui você pode adicionar o cálculo à lista de registros
    this.dataSource.data = [...this.dataSource.data, this.extraHours];
    this.extraHours = {
      id: 0,
      idUser: 0,
      hoursWorked: 0,
      baseRateDay: 0,
      valueHourBase: 0,
      totalValueEarnedDay: 0,
      dayOfWeek: '',
      created: new Date(),
      updated: new Date(),
    };
  }

 

  loadFictitiousData() {
    const fictitiousData = this.service.getFictitiousData();
    this.dataSource.data = fictitiousData;
  }

  exportarPraCsv() {
    // Lógica para exportação para CSV
    const csvData = this.dataSource.data.map((row) => ({
      id: row.id,
      idUser: row.idUser,
      dayOfWeek: row.dayOfWeek,
      hoursWorked: row.hoursWorked,
      totalValueEarnedDay: row.totalValueEarnedDay,
      created: row.created.toISOString(),
    }));
    const csvString = this.convertToCSV(csvData);
    this.downloadCSV(csvString);
  }

  convertToCSV(data: any[]): string {
    const header = Object.keys(data[0]).join(',') + '\n';
    const rows = data
      .map((row) => Object.values(row).join(','))
      .join('\n');
    return header + rows;
  }

  downloadCSV(csvString: string) {
    const blob = new Blob([csvString], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ExtraHours_${new Date().toISOString()}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  }
}
