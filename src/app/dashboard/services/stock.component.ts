
import { Injectable, Inject } from '@angular/core';

@Injectable({
    providedIn: 'root'
})

export class StockData {
    boughtPrice;
    symbol;
    noOfShares;
    currentPrice;
    maximumPrice;
    percentage;
    totalProfit;

    constructor(@Inject('boughtPrice') boughtPrice: number, @Inject('symbol') symbol: string, @Inject('noOfShares') noOfShares: number, @Inject('maximumPrice') maximumPrice?: number,
    @Inject('percentage') percentage?: number, @Inject('currentPrice') currentPrice?: number, @Inject('totalProfit') totalProfit?: number) {
        this.boughtPrice = boughtPrice;
        this.symbol = symbol;
        this.noOfShares = noOfShares;
        this.maximumPrice = maximumPrice;
        this.percentage = percentage;
        this.currentPrice = currentPrice;
        this.totalProfit = totalProfit;
    }
     public getMximumPrice(): number{
        return this.maximumPrice != undefined ? this.maximumPrice : 0
     }
     public setMaximumPrice(maxPrice: number){
        this.maximumPrice = maxPrice
     }
}
