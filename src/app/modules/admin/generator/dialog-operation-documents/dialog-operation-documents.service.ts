import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogOperationDocumentsComponent } from './dialog-operation-documents.component';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DialogOperationDocumentsService {
  constructor(private dialog: MatDialog) {}

  openDocumentsDialog(data: any): Observable<boolean> {
    const dialogRef = this.dialog.open(DialogOperationDocumentsComponent, {
      data: data,
      width: '80vw',
      height: '90vh',
      maxWidth: '100vw',
      maxHeight: '100vh',
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
