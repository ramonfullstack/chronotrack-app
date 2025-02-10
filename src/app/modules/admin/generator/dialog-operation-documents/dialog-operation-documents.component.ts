import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { GeneratorService } from '../generator.service';

@Component({
  selector: 'app-dialog-operation-documents',
  templateUrl: './dialog-operation-documents.component.html',
  styleUrls: ['./dialog-operation-documents.component.scss'],
})
export class DialogOperationDocumentsComponent implements OnInit {
  dataSource!: MatTableDataSource<any>;
  displayedColumns: string[] = [
    'credenciadora',
    'bandeira',
    'valorTotalUr',
    'valorTravado',
    'valorLiberado',
    'prazo',
  ];

  selectedDocument: string;
  documentUrl: SafeResourceUrl | null = null;
  hasAnexo: boolean;
  hasCessaoUr: boolean;
  idAnticipation: number;

  @ViewChild(MatSort) sort!: MatSort;
  valorTotalLiberado: number;
  valorTotalTravado: number;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public service: GeneratorService, private sanitizer: DomSanitizer,) {}

  ngOnInit(): void {
   this.hasAnexo = this.data.hasAnexo == 1
   this.hasCessaoUr = this.data.hasCessaoUr == 1
   this.idAnticipation = this.data.idAnticipation

   this.service.getAnticipationDocuments(this.idAnticipation, "cessao_ur").subscribe((resp: any) => {
    this.documentUrl = this.sanitizer.bypassSecurityTrustResourceUrl(resp.signedFileUrl);
  });
  }

}
