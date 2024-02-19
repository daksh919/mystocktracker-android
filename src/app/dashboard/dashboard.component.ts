import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { StoreFetchDataComponent } from './store-fetch-data/store-fetch-data.component';
import { ProcessDataComponent } from './process-data/process-data.component';
import { LoadHardCodedData } from './services/loadHardCodedData';
import { StockData } from './services/stock.component';
import { LoadTabelComponent } from './load-tabel/load-tabel.component';
import { LoadingController } from '@ionic/angular/standalone';

@Component({
  selector: 'app-home-component',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  addStock: string = '';
  stockkListSize: boolean = false;

  testCodeWithRealData: boolean = false;

  constructor(private dialog: MatDialog, private router: Router, private fetchLocal: StoreFetchDataComponent, private initializeData: ProcessDataComponent,
    private loadData: LoadHardCodedData, private loadTable: LoadTabelComponent, private loadingCtrl: LoadingController) { }

  stockList: StockData[] = this.loadData.getStockData();
  ngOnInit(): void {
    this.testCodeWithRealData = false;
    this.stockkListSize = false;
  }

  onCheckboxChange(event: any) {
    this.testCodeWithRealData = event.target.checked;
  }

  fetchData() {
    this.initializeData.initializeData(this.testCodeWithRealData);
  }

  Signout() {
    localStorage.removeItem("LoggedInUser");
    this.router.navigate(['']);
  }

  async showLoading() {
    const loading = await this.loadingCtrl.create({
      message: 'Dismissing after 3 seconds...',
      duration: 3000,
    });

    loading.present();
  }

  updateTable() {

    let token = localStorage.getItem("accessToken");
    if (token != null) {
      let totalStocks = this.loadData.getAllStockList().length;
      if (totalStocks == 0) {
        this.stockkListSize = true;
      }
      else {
        this.fetchData();
        setTimeout(() => {
          this.router.navigate(['loadTabel']);
        }, 2000)
      }
    }
    else {
      window.alert("Please add your own token from Settings.");
    }
  }

  addStockData() {
    console.log("1>" + JSON.stringify(this.stockList))
    let doesDataExist = false;
    if (this.addStock.length == 0) {
      window.alert("Please enter stock symbol")
    }
    else {
      for (let stock of this.stockList) {
        if (stock.symbol == this.addStock) {
          doesDataExist = true;
        }
      }
      if (!doesDataExist) {

        this.openModal(this.addStock);
      }
      else {
        window.alert("Data already exist")
      }
    }
  }

  openModal(symbol: string): void {
    this.loadTable.openModal(symbol, this.stockList, this.stockList.length, true);
    this.addStock = ''
  }
}