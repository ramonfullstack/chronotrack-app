import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogOperationDetailsComponent } from './dialog-operation-details.component';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DialogOperationDetailsService {
  constructor(private dialog: MatDialog) {}

  openDialog(data: any): Observable<boolean> {
    const dialogRef = this.dialog.open(DialogOperationDetailsComponent, {
      data: data,
      width: '90%',
      maxWidth: '900px',
      autoFocus: false,
    });
    return new Observable((observavel) => {
      dialogRef.afterClosed().subscribe((result: any) => {
        observavel.next(result);
        observavel.complete();
      });

      dialogRef.backdropClick().subscribe(() => {
        observavel.next(false);
        observavel.complete();
      });

      dialogRef.keydownEvents().subscribe((result: any) => {
        if (result.key === 'Escape') {
          observavel.next(false);
          observavel.complete();
        }
      });
    });
  }
}
