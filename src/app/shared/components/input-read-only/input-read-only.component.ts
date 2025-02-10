import { Component, Input } from '@angular/core';

@Component({
  selector: 'input-readonly',
  template: `
    <mat-form-field appearance="fill" floatLabel="always" [class]="classCss">
      <mat-label>{{ label }}</mat-label>
      <input matInput [value]="value" readonly>
    </mat-form-field>
  `,
  styles: [``]
})
export class InputReadOnlyComponent {
  @Input() classCss: string = "col-12 col-md-6 col-lg-4";
  @Input() value: any;
  @Input() label: any;
}
