import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GeneratorComponent } from './generator/generator.component';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatMenuModule } from '@angular/material/menu';
import { NgxMaskModule } from 'ngx-mask';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDividerModule } from '@angular/material/divider';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { DialogOperationDetailsComponent } from './dialog-operation-details/dialog-operation-details.component';
import { MatDialogModule } from '@angular/material/dialog';
import { DialogOperationDocumentsComponent } from './dialog-operation-documents/dialog-operation-documents.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { GeneratorRoutingModule } from './generator-routing.module';

@NgModule({
  declarations: [GeneratorComponent, DialogOperationDetailsComponent, DialogOperationDocumentsComponent],
  imports: [
    CommonModule,
    MatCardModule,
    MatFormFieldModule,
    MatCheckboxModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    MatPaginatorModule,
    MatMenuModule,
    NgxMaskModule.forRoot(),
    MatDatepickerModule,
    MatDividerModule,
    MatTableModule,
    MatSortModule,
    MatSelectModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    MatTooltipModule, 
    GeneratorRoutingModule
  ],
  exports: [GeneratorComponent],
})
export class GeneratorModule {}
