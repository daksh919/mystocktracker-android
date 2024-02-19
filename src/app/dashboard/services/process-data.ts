import { Injectable } from '@angular/core';
import { RestService } from './rest.service';
import { StoreFetchDataComponent } from '../store-fetch-data/store-fetch-data.component';

@Injectable({
    providedIn: 'root'
})

export class ProcessDataService {
    constructor(private restService: RestService, private storeData: StoreFetchDataComponent) { }

    realTimeResponse: any;
    currentPrice: number = 0;

    public getRealTimeData(symbol: string, testCodeWithRealData: boolean, stockList: any) {
        console.log(testCodeWithRealData ? "Calling api to fetch real time data" : "Fetching data from local storage")
        this.restService.getStockPrice(symbol, testCodeWithRealData).subscribe((response) => {
            if (testCodeWithRealData) {
                this.realTimeResponse = response;
                console.log("Last closed price fetched is " + this.realTimeResponse.close)
                var maxReturnValue = 0;
                //set user close price on data fetching from local storage
                //response.close = 1145;
                this.currentPrice = this.realTimeResponse.close;
                maxReturnValue = this.storeData.loadData(symbol, this.realTimeResponse, stockList);
                let returnValue = 0;
                let currentLocalData = this.storeData.getData(symbol);
                const currentMaxValue: number | null = currentLocalData != null ? currentLocalData.MaximumPrice : 0;
                let max = currentMaxValue != null ? currentMaxValue : 0;
                if (this.currentPrice < max) {
                    returnValue = Math.round(((this.currentPrice - max) / max) * 100);
                }
                this.storeData.updatePercentage(symbol, returnValue);
            }
            else {
                for (let stock of stockList) {
                    if (symbol == stock.symbol) {
                        this.realTimeResponse = this.storeData.getData(symbol);
                    }
                }
                if (this.realTimeResponse == null || this.realTimeResponse == undefined) {
                    console.log("No data found in local storage")
                }
                else {
                    var maxReturnValue = 0;
                    //set user close price on data fetching from local storage
                    //let aValue = this.realTimeResponse.close;
                    //let bValue = aValue < 3000 ? (aValue+100) : (aValue+250);
                    //aValue = aValue < 3000 ? (aValue-100) : (aValue-250);
                    //this.realTimeResponse.close = Math.floor(Math.random() * (bValue - aValue + 1)) + aValue;
                    this.currentPrice = this.realTimeResponse.close;

                    console.log("Last closed price fetched is " + this.realTimeResponse.close);
                    maxReturnValue = this.storeData.loadData(symbol, this.realTimeResponse, stockList);
                    let returnValue = 0;
                    let currentLocalData = this.storeData.getData(symbol);
                    const currentMaxValue: number | null = currentLocalData != null ? currentLocalData.MaximumPrice : 0;
                    let max = currentMaxValue != null ? currentMaxValue : 0;
                    console.log("CurrentMaxValue is " + max + " Current Price is " + this.currentPrice)
                    if (this.currentPrice < max) {
                        returnValue = Math.round(((this.currentPrice - max) / max) * 100);
                    }
                    this.storeData.updatePercentage(symbol, returnValue);
                }
            }
        },
            (error) => { console.error(error); }
        );

    }

    processData(symbol: string, testCodeWithRealData: boolean, stockList: any) {
        console.log("Processing data for " + symbol)
        this.getRealTimeData(symbol, testCodeWithRealData, stockList);
    }
}