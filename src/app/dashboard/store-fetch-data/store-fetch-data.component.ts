import { PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

import { Injectable, Inject } from '@angular/core';
import { LoadHardCodedData } from '../services/loadHardCodedData';
import { StockData } from '../services/stock.component';

@Injectable({
  providedIn: 'root'
})


export class StoreFetchDataComponent {

  constructor(@Inject(PLATFORM_ID) private platformId: Object, private addData: LoadHardCodedData) { }
  public setUserIdOnInitialization() {
    if (isPlatformBrowser(this.platformId)) {
      let doesUserExist = localStorage.getItem("LoggedInUser");
      let putUser = doesUserExist != undefined && doesUserExist.length > 0 ? doesUserExist : "";
      localStorage.setItem("LoggedInUser", putUser);
    }
  }

  public getUserLoginId() {
    if (isPlatformBrowser(this.platformId)) {
      const currentUser = localStorage.getItem("LoggedInUser");
      return currentUser;
    }
    return "";
  }

  public updateLoginId(email: string) {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem("LoggedInUser", JSON.stringify(email))
    }
  }

  public getSize(): number {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.length;
    }
    return 0;
  }
  public getData(symbol: string) {
    if (isPlatformBrowser(this.platformId)) {
      const getLocalStorage: string | null = localStorage.getItem(symbol);
      var currentLocalData = JSON.parse(getLocalStorage == null ? "null" : getLocalStorage);
    }
    return currentLocalData;
  }

  deleteAllRecord(stockList: any) {
    if (isPlatformBrowser(this.platformId)) {
      for (let idx of stockList) {
        const getLocalStorage: string | null = localStorage.getItem(idx.symbol);
        let currentLocalData = JSON.parse(getLocalStorage == null ? "null" : getLocalStorage);
        currentLocalData.MaximumPrice = 0;
        currentLocalData.history = [];
        currentLocalData.percentage = 0;
        currentLocalData.lastBoughtPrice = 0;
        localStorage.setItem(idx.symbol, JSON.stringify(currentLocalData))
      }
      //localStorage.clear();
    }
  }
  updateData(stockList: any, symbol: string, priceAtBoughtShare: number, sharesBought: number) {
    var dataExist: boolean = false;
    var currentDate = new Date();
    var oldShares = 0;
    var oldBuyPrice = 0;
    console.log("Check if this data exist for " + symbol + " inside local storage")
    console.log(JSON.stringify(stockList))
    if (isPlatformBrowser(this.platformId)) {
      for (let idx of stockList) {
        if (idx.symbol == symbol) {
          dataExist = true;
          idx.maximumPrice = priceAtBoughtShare;
          idx.percentage = 0;
          oldShares = idx.noOfShares;
          oldBuyPrice = idx.boughtPrice;
        }
      }
      console.log(dataExist)
      if (!dataExist) {
        this.loadData(symbol, null, stockList, priceAtBoughtShare, sharesBought);
      }
      else {
        let averagePrice = (oldShares * oldBuyPrice + Number(sharesBought) * Number(priceAtBoughtShare));
        const getLocalStorage: string | null = localStorage.getItem(symbol);
        let currentLocalData = JSON.parse(getLocalStorage == null ? "null" : getLocalStorage);
        currentLocalData.MaximumPrice = Number(priceAtBoughtShare);
        currentLocalData.ExtraSharesBought = currentLocalData.ExtraSharesBought + Number(sharesBought);


        currentLocalData.BoughtPrice = averagePrice / (Number(currentLocalData.NumberOfShares) + Number(currentLocalData.ExtraSharesBought));
        currentLocalData.lastBoughtPrice = Number(priceAtBoughtShare);
        var historyMessage = "Bought " + sharesBought + " shares of " + symbol + " at price " + priceAtBoughtShare + "Rs. on " + currentDate;
        var tempList = currentLocalData.history;
        tempList.push(historyMessage)
        currentLocalData.history = tempList;

        localStorage.setItem(symbol, JSON.stringify(currentLocalData));
      }
    }
  }
  loadData(symbol: string, response: any, stockList: any, priceAtBoughtShare?: number, sharesBought?: number) {
    var dataExist: boolean = false;
    var maxReturnValue = 0;
    if (isPlatformBrowser(this.platformId)) {
      const getLocalStorage: string | null = localStorage.getItem(symbol);
      let currentLocalData = JSON.parse(getLocalStorage == null ? "null" : getLocalStorage);
      const currentMaxValue: number | null = currentLocalData != null ? currentLocalData.MaximumPrice : 0;
      console.log("Current Max Value is " + currentMaxValue)
      if (currentLocalData == null) {
        console.log("No data exist in local storage for " + symbol + ", reating new entry for")
        var dataToPass = {
          "Symbol": symbol,
          "BoughtPrice": 0,
          "NumberOfShares": 0,
          "MaximumPrice": 0,
          "history": [],
          "lastBoughtPrice": 0,
          "close": 0,
          "percentage": 0,
          "ExtraSharesBought": 0
        }

        let realTimeValue: number = response != null ? response.close : priceAtBoughtShare;
        let boughtValue = 0;
        let numberOfShares = 0
        for (let idx of stockList) {
          if (idx.symbol == symbol) {
            dataExist = true;
            boughtValue = idx.boughtPrice;
            numberOfShares = idx.noOfShares;
          }
        }
        if (!dataExist) {
          boughtValue = priceAtBoughtShare != undefined ? priceAtBoughtShare : 0;
          numberOfShares = sharesBought != undefined ? sharesBought : 0;
          let newStock = new StockData(numberOfShares, symbol, boughtValue);
          this.addData.addStockData(newStock)
        }
        let maxValue: number = boughtValue !== null && boughtValue > realTimeValue ? boughtValue : realTimeValue;
        dataToPass.BoughtPrice = boughtValue;
        dataToPass.NumberOfShares = numberOfShares;
        dataToPass.MaximumPrice = maxValue
        dataToPass.history = [];
        dataToPass.lastBoughtPrice = 0;
        dataToPass.close = realTimeValue;
        dataToPass.percentage = 0;
        dataToPass.ExtraSharesBought = 0;
        localStorage.setItem(symbol, JSON.stringify(dataToPass));
        maxReturnValue = maxValue;
      }

      else {
        let realTimeValue: number = response.close;
        let maxValue: number = currentMaxValue !== null && currentMaxValue > realTimeValue ? currentMaxValue : realTimeValue;
        currentLocalData.close = realTimeValue;
        currentLocalData.MaximumPrice = maxValue;
        localStorage.setItem(symbol, JSON.stringify(currentLocalData));
        maxReturnValue = maxValue;
      }
    }
    return maxReturnValue;
  }

  updatePercentage(symbol: string, percentage: number) {
    if (isPlatformBrowser(this.platformId)) {
      const getLocalStorage: string | null = localStorage.getItem(symbol);
      let currentLocalData = JSON.parse(getLocalStorage == null ? "null" : getLocalStorage);
      if (currentLocalData != null) {
        currentLocalData.percentage = percentage;
        localStorage.setItem(symbol, JSON.stringify(currentLocalData))
        console.log("Response has been updated in storage")
        console.log(JSON.stringify(currentLocalData))
      }
    }
  }
  updateStockData(stockData: StockData) {
    if (isPlatformBrowser(this.platformId)) {
      const getLocalStorage: string | null = localStorage.getItem(stockData.symbol);
      let currentLocalData = JSON.parse(getLocalStorage == null ? "null" : getLocalStorage);
      currentLocalData.BoughtPrice = stockData.boughtPrice;
      currentLocalData.NumberOfShares = stockData.noOfShares;

      localStorage.setItem(stockData.symbol, JSON.stringify(currentLocalData));
    }
  }
}
