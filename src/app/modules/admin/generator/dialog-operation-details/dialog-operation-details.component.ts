import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-dialog-operation-details',
  templateUrl: './dialog-operation-details.component.html',
  styleUrls: ['./dialog-operation-details.component.scss'],
})
export class DialogOperationDetailsComponent implements OnInit {
  dataSource!: MatTableDataSource<any>;
  displayedColumns: string[] = [
    'credenciadora',
    'bandeira',
    'valorTotalUr',
    'valorTravado',
    'valorLiberado',
    'prazo',
  ];

  @ViewChild(MatSort) sort!: MatSort;
  valorTotalUrs: number;
  valorTotalLiberado: number;
  valorTotalTravado: number;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}

  ngOnInit(): void {
    this.valorTotalUrs = this.data.ursDetail.reduce(
      (total: any, urDetail: any) => total + urDetail.valorTravado,
      0
    );
    this.valorTotalLiberado = this.data.ursDetail.reduce(
      (total: any, urDetail: any) => total + urDetail.valorLiberado,
      0
    );
    this.valorTotalTravado = this.data.ursDetail.reduce(
      (total: any, urDetail: any) => total + urDetail.valorTravado,
      0
    );

    this.dataSource = new MatTableDataSource(this.data.ursDetail);
    this.dataSource.sort = this.sort;
  }
}
