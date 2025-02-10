import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTreeModule } from '@angular/material/tree';
import { MatBadgeModule } from '@angular/material/badge';

import { SidebarComponent } from './components/sidebar/sidebar.component';
import { LayoutComponent } from './components/layout/layout.component';
import { LoadingComponent } from './components/loading/loading.component';
import { ConfirmDialogComponent } from '@shared/components/confirm-dialog/confirm-dialog.component';
import { InputReadOnlyComponent } from './components/input-read-only/input-read-only.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCheckboxModule } from '@angular/material/checkbox';
@NgModule({
  declarations: [
    SidebarComponent,
    LayoutComponent,
    LoadingComponent,
    ConfirmDialogComponent,
    InputReadOnlyComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    MatIconModule,
    MatDividerModule,
    MatListModule,
    MatMenuModule,
    MatToolbarModule,
    MatButtonModule,
    MatSlideToggleModule,
    MatSidenavModule,
    MatDialogModule,
    MatTreeModule,
    MatBadgeModule,
    MatInputModule,
    MatFormFieldModule,
    MatSnackBarModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    ReactiveFormsModule,
    MatCardModule,
    MatSelectModule,
    MatDatepickerModule,
    MatCheckboxModule,
  ],
  exports: [LayoutComponent, LoadingComponent, InputReadOnlyComponent],
})
export class SharedModule {}
