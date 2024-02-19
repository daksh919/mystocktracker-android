import { Component, OnInit, Inject } from '@angular/core';
import { PLATFORM_ID } from '@angular/core';
import { Injectable } from '@angular/core';
import { RestService } from '../services/rest.service';
import { CommonModule } from '@angular/common';
import { StockData } from '../services/stock.component';
import { FormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { BuyShareComponent } from '../buy-share/buy-share.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { StoreFetchDataComponent } from '../store-fetch-data/store-fetch-data.component';
import { LoadHardCodedData } from '../services/loadHardCodedData';
import { IonButton, IonContent, IonRefresher, IonRefresherContent } from '@ionic/angular/standalone';
import { RouterLink } from '@angular/router';

@Injectable({ providedIn: 'root' })

@Component({
  selector: 'app-load-tabel',
  standalone: true,
  imports: [IonButton, FormsModule, CommonModule, IonContent, IonRefresher, IonRefresherContent, RouterLink],
  templateUrl: './load-tabel.component.html',
  styleUrl: './load-tabel.component.css'
})
export class LoadTabelComponent implements OnInit {

  constructor(private restService: RestService, @Inject(PLATFORM_ID) private platformId: Object, public dialog: MatDialog, private snackBar: MatSnackBar,
    private storeData: StoreFetchDataComponent, private loadHardData: LoadHardCodedData) { }

  totalInvestAmount = 0;
  currentInvestedAmount = 0;
  testCodeWithRealData: boolean;

  currentPriceSortOrder: 'asc' | 'desc' = 'asc';
  currentSortColumn: string | null = null;
  notificationMessage: string | null = null;
  clickedRows: Set<number> = new Set<number>();
  showAmounts: boolean = false;
  checkBalance: string = "Check Balance";
  showHistory: string = "Show History"
  historyOfStocks: string[] = [];

  stockList = this.loadHardData.getStockData();
  updateTable() {
    this.stockList = this.loadHardData.getStockData();
    this.totalInvestAmount = 0;
    this.currentInvestedAmount = 0
    for (let currentStock of this.stockList) {
      var responseData = this.storeData.getData(currentStock.symbol);
      currentStock.noOfShares = responseData.NumberOfShares + Number(responseData.ExtraSharesBought);
      currentStock.boughtPrice = responseData.BoughtPrice;
      currentStock.maximumPrice = responseData.MaximumPrice;
      currentStock.currentPrice = responseData.close;
      currentStock.percentage = responseData.percentage;
      currentStock.totalProfit = Math.round(currentStock.noOfShares * (responseData.close != undefined ? responseData.close : 0) -
        (currentStock.noOfShares * responseData.BoughtPrice));

      console.log("total profit is" + currentStock.totalProfit + " shares " + responseData.NumberOfShares)

      this.totalInvestAmount = this.totalInvestAmount + Math.round(currentStock.noOfShares * currentStock.boughtPrice);
      this.currentInvestedAmount = this.currentInvestedAmount + Math.round(currentStock.noOfShares * responseData.close);
      console.log("Sending data to tabel");
      console.log(currentStock.symbol + " " + currentStock.noOfShares + " " + currentStock.boughtPrice + " " + currentStock.maximumPrice + " " + currentStock.currentPrice
        + currentStock.totalProfit + " " + currentStock.percentage)
    }
    if (this.currentSortColumn === null) {
      this.currentSortColumn = 'stockName';
    }
    this.sortStockList(this.currentSortColumn);
  }
  ngOnInit(): void {
    console.log("Loading data for displaying table");
      this.updateTable();
  }
  boughtShareProcess(symbol: string, index: number) {
    this.openModal(symbol, this.stockList, index);
  }

  openModal(symbol: string, stockList: StockData[], index: number, mainPage?: boolean): void {
    const dialogRef = this.dialog.open(BuyShareComponent, {
      width: '500px',
      disableClose: true,
      data: {
        symbol: symbol,
        stockList: stockList
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      const sharesBought = result ? JSON.parse(JSON.stringify(result)).result.SharesBought : 0;
      const PriceAtBoughtShare = result ? JSON.parse(JSON.stringify(result)).result.PriceAtBoughtShare : 0;
      if (sharesBought > 0) {
        let addStock = new StockData(PriceAtBoughtShare, symbol, sharesBought);
        console.log("Bought " + sharesBought + " shares of " + symbol + " at price " + PriceAtBoughtShare)
        if (sharesBought > 0) {
          if (this.clickedRows.has(index)) {
            this.clickedRows.delete(index);
          } else {
            this.clickedRows.add(index);
          }
          this.storeData.updateData(this.stockList, symbol, PriceAtBoughtShare, sharesBought);
          this.openSnackBar("You have bought " + sharesBought + " shares of " + symbol + " at " + PriceAtBoughtShare);
          this.updateStockData(symbol, sharesBought, PriceAtBoughtShare);
          if (!mainPage) location.reload();
        }
      }
    });
  }

  updateStockData(symbol: string, sharesBought: number, priceAtBoughtShare: number) {
    this.stockList = this.loadHardData.getStockData();
    this.storeData.updatePercentage(symbol, 0);
    for (let stock of this.stockList) {
      if (stock.symbol == symbol) {
        let averagePrice = (stock.noOfShares * stock.boughtPrice + Number(sharesBought) * Number(priceAtBoughtShare));
        stock.noOfShares = stock.noOfShares + Number(sharesBought);
        stock.boughtPrice = Number((averagePrice / stock.noOfShares).toFixed(2));
        stock.totalProfit = Math.round(stock.noOfShares * (stock.currentPrice != undefined ? stock.currentPrice : 0) -
          (stock.noOfShares * stock.boughtPrice));
      }
    }
  }
  openSnackBar(message: string, action: string = 'Close') {
    this.snackBar.open(message, action, {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }

  isRowClicked(index: number): boolean {
    return this.clickedRows.has(index);
  }

  isButtonDisabled(percentage: number | undefined): boolean {
    return percentage === 0 || percentage === undefined;
  }

  sortStockList(toggleVariable: string) {
    this.stockList.sort((a, b) => {
      let priceA = 0;
      let priceB = 0;
      let stockNameA = "";
      let stockNameB = "";
      if (toggleVariable == "shares") {
        priceA = a.noOfShares ?? 0;
        priceB = b.noOfShares ?? 0;
      }
      else if (toggleVariable == "boughtPrice") {
        priceA = a.boughtPrice ?? 0;
        priceB = b.boughtPrice ?? 0;
      }
      else if (toggleVariable == "maxPrice") {
        priceA = a.maximumPrice ?? 0;
        priceB = b.maximumPrice ?? 0;
      }
      else if (toggleVariable == "currentPrice") {
        priceA = a.currentPrice ?? 0;
        priceB = b.currentPrice ?? 0;
      }
      else if (toggleVariable == "perentage") {
        priceA = a.percentage ?? 0;
        priceB = b.percentage ?? 0;
      }
      else if (toggleVariable == "totalProfitLoss") {
        priceA = a.totalProfit ?? 0;
        priceB = b.totalProfit ?? 0;
      }
      else if (toggleVariable == "stockName") {
        stockNameA = a.symbol;
        stockNameB = b.symbol;
        if (this.currentPriceSortOrder === 'asc') {
          return stockNameA.localeCompare(stockNameB);
        } else {
          return stockNameB.localeCompare(stockNameA);
        }
      }

      if (this.currentPriceSortOrder === 'asc') {
        return priceA - priceB;
      } else {
        return priceB - priceA;
      }
    });
  }

  toggleCurrentPriceSortOrder(toggleVariable: string) {
    this.currentPriceSortOrder = this.currentPriceSortOrder === 'asc' ? 'desc' : 'asc';
    this.currentSortColumn = toggleVariable;
    this.sortStockList(toggleVariable);
  }

  toggleVisibility(): void {
    this.checkBalance = this.checkBalance == "Check Balance" ? "Hide Balance" : "Check Balance";
    this.showAmounts = !this.showAmounts;
  }

  checkHistory() {
    this.showHistory = this.showHistory == "Show History" ? "Hide History" : "Show History";
    this.historyOfStocks = [];
    if (this.showHistory != "Show History") {
      for (let currentStock of this.stockList) {
        var responseData = this.storeData.getData(currentStock.symbol);
        let priceAtBoughtShare = responseData.lastBoughtPrice;
        let history = responseData.history;
        if (Number(priceAtBoughtShare) > 0)
          for (let idx of history) {
            this.historyOfStocks.push(idx);
          }

      }
    }
  }

  //button removed for this functionality
  deleteAllRecord() {
    this.storeData.deleteAllRecord(this.stockList);
  }

  deleteStock(symbol: string, index: number): void {
    let stockkListToEdit = this.loadHardData.getAllStockList();
    const confirmation = window.confirm('Are you sure you want to delete this stock? This cannot be undone.');
    if (confirmation) {
      this.loadHardData.deleteStock(symbol);
      location.reload();
    }
  }
  handleRefresh(event: any) {
    location.reload();
  }
}