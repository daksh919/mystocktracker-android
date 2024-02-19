import { Component, OnInit } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { environment } from 'src/environments/environment';
import { initializeApp } from 'firebase/app';
import { StoreFetchDataComponent } from './dashboard/store-fetch-data/store-fetch-data.component';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  standalone: true,
  imports: [IonApp, IonRouterOutlet],
})
export class AppComponent implements OnInit{
  constructor(private localStorage: StoreFetchDataComponent) {}

  ngOnInit(): void {
    const app = initializeApp(environment.firebase);
    this.localStorage.setUserIdOnInitialization();
  }
}
