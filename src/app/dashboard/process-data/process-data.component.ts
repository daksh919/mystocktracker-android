import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Injectable } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadHardCodedData } from '../services/loadHardCodedData';
import { FormsModule } from '@angular/forms';
import { LoadTabelComponent } from '../load-tabel/load-tabel.component';
import { ProcessDataService } from '../services/process-data';
import { StoreFetchDataComponent } from '../store-fetch-data/store-fetch-data.component';

@Injectable({ providedIn: 'root' })

@Component({
  selector: 'app-process-data',
  standalone: true,
  imports: [CommonModule, FormsModule, LoadTabelComponent],
  templateUrl: './process-data.component.html',
  styleUrl: './process-data.component.css'
})

export class ProcessDataComponent implements OnInit {
  @ViewChild('myButton') myButton: ElementRef;
  testCodeWithRealData: boolean;
  hideLoadButton = true;
  constructor(private processData: ProcessDataService, private loadHardData: LoadHardCodedData, private storeData: StoreFetchDataComponent,private loadTable:LoadTabelComponent) { }
  stockList = this.loadHardData.getStockData();

  dataLoaded: boolean = false;
  noDataPresent: boolean = false;
  ngOnInit(): void {
    this.dataLoaded = false;
    this.stockList = this.loadHardData.getStockData();
    if (this.stockList.length == 0) {
      this.noDataPresent = true;
    }
  }

  ngAfterViewInit() {
    if (!this.noDataPresent) {
      setTimeout(() => {
        this.myButton.nativeElement.click();
      }, 2000)
    }
  }


  initializeData(realData: boolean) {
    console.log("Starting application with real time value? ")
    console.log(realData ? "YES" : "NO")
    this.testCodeWithRealData = realData;
    this.stockList = this.loadHardData.getStockData();
    console.log("Length of stock data "+this.stockList.length);
    if (this.stockList.length != 0) {
      for (let currentStock of this.stockList) {
        this.processData.processData(currentStock.symbol, this.testCodeWithRealData, this.stockList);
      }

  }
}

  dataHasBeenLoaded() {
    this.dataLoaded = true;
  }

}