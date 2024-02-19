import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-buy-share',
  standalone: true,
  imports: [CommonModule, FormsModule, MatDialogModule, MatInputModule],
  templateUrl: './buy-share.component.html',
  styleUrl: './buy-share.component.css'
})
export class BuyShareComponent implements OnInit {
  sharesBought = 0;
  priceAtBoughtShare = 0;

  stockSymbol: string = "";
  noOfShares: number = 0;
  currentPrice: number = 0;
  boughtPrice: number = 0;

  constructor(private dialogRef: MatDialogRef<BuyShareComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
    console.log("Buy-Share modal opened")
    this.stockSymbol = data.symbol;
    for (let stock of data.stockList) {
      if (this.stockSymbol == stock.symbol) {
        this.noOfShares = stock.noOfShares;
        this.currentPrice = stock.currentPrice;
        this.boughtPrice = stock.boughtPrice;
      }
    }
  }

  ngOnInit(): void {
      this.priceAtBoughtShare = this.currentPrice;
  }
  stockName: String = "";
  stockPrice: number = 0;

  submit(): void {
    let returnData = { "SharesBought": this.sharesBought, "PriceAtBoughtShare": this.priceAtBoughtShare }
    this.dialogRef.close({ result: returnData });
  }
  close(): void {
    this.dialogRef.close();
  }
  isSubmitDisabled(): boolean {

    return isNaN(this.sharesBought) || this.sharesBought <= 0 ||
      isNaN(this.priceAtBoughtShare) || this.priceAtBoughtShare <= 0;
  }
}
