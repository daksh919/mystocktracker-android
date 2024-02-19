import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class RestService {
  private apiUrl = 'https://eodhd.com/api/real-time/';
  private apiToken = localStorage.getItem("accessToken");

  constructor(public http: HttpClient) { }

  getStockPrice(symbol: string, testCodeWithRealData: boolean): Observable<any> {
    const stockUrl = `${this.apiUrl}` + symbol + '.NSE?api_token=' + `${this.apiToken}` + '&fmt=json';
    if (testCodeWithRealData) {
      console.log("Calling API to get live data for " + symbol)
      console.log(stockUrl);
      return this.http.get(stockUrl);
    }
    return of(null);
  }
}