import { StockData } from './stock.component';
import { isPlatformBrowser } from '@angular/common';
import { Injectable, Inject } from '@angular/core';
import { PLATFORM_ID } from '@angular/core';
@Injectable({
  providedIn: 'root'
})

export class LoadHardCodedData {

  constructor(@Inject(PLATFORM_ID) private platformId: Object) { }

  stockList: StockData[] = []

  getStockData() {
    console.log("Getting all stock list");
    this.stockList = this.getAllStockList();
    console.log(this.stockList)
    return this.stockList;
  }

  addStockData(stockData: StockData) {
    this.stockList.push(stockData);
  }

  getAllStockList() {
    let stockList = [];
    if (isPlatformBrowser(this.platformId)) {
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i) || "";
        const getLocalStorage: string | null = key ? localStorage.getItem(key) : null;
        if (key != "LoggedInUser" && key != "accessToken" ) {
          var currentLocalData = JSON.parse(getLocalStorage == null ? "null" : getLocalStorage);
          var x = new StockData(currentLocalData.BoughtPrice, currentLocalData.Symbol, (currentLocalData.NumberOfShares+currentLocalData.ExtraSharesBought));
          stockList.push(x);
        }
      }
    }
    return stockList;
  }

  deleteStock(symbolToDelete: string) {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem(symbolToDelete)
    }
  }
}