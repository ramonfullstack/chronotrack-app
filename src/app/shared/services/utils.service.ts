import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { ConfirmDialogComponent } from '@shared/components/confirm-dialog/confirm-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class UtilsService {
  constructor(private dialog: MatDialog, private matSnackBar: MatSnackBar) {}

  /**
   * Modal generico de confirmação de ação
   * @param {String} title - Titulo do modal
   * @param {String} description - Descrição ou pegunta do modal
   * @param {String} confirmActionLabel - label do botão de confirmação da ação
   * @param {String} cancelActionLabel - label do botão de cancelamento da ação
   * @returns {Observable<boolean>} retorna um observable booleano de confirmação da ação
   */
  confirmationDialog(
    title: String,
    description: String,
    confirmActionLabel: String,
    cancelActionLabel: String
  ): Observable<boolean> {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title,
        description,
        confirmActionLabel,
        cancelActionLabel,
      },
      autoFocus: false,
    });

    return new Observable((observavel) => {
      dialogRef.afterClosed().subscribe((result) => {
        observavel.next(result);
        observavel.complete();
      });

      dialogRef.backdropClick().subscribe((result) => {
        observavel.next(false);
        observavel.complete();
      });

      dialogRef.keydownEvents().subscribe((result) => {
        if (result.key === 'Escape') {
          observavel.next(false);
          observavel.complete();
        }
      });
    });
  }

  /**
   * Função geradora de cor hexadecimal aleatória
   * @returns {String} cor hexadecimal aleatória
   */
  randomColorGenerator() {
    // const color = (Math.random()*0xFFFFFF<<0).toString(16);
    const color = Math.floor(Math.random() * 16777215).toString(16);
    return `#${color}`;
  }

  /**
   * Notificação generica
   * @param {String} message - Mensagem que aparecerá na notificação
   * @param {String} tipo - tipo que pode ser 'error' ou 'sucesso'
   * @param {String} time - Tempo em milisegundos que a notifação ficara visivel
   */
  notification(
    message: string,
    tipo: 'error' | 'sucesso',
    time: number = 5000
  ) {
    this.matSnackBar.open(message, '', {
      duration: time,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
      panelClass: [tipo],
    });
  }
}
