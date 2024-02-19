import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-stock-details',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './stock-details.component.html',
  styleUrl: './stock-details.component.css'
})
export class StockDetailsComponent {
  symbol: string = ""
  constructor(private dialogRef: MatDialogRef<StockDetailsComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { 
    this.symbol = data;
  }

  submit(): void {
    this.dialogRef.close({});
  }

}
