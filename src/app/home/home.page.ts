import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonButtons, IonIcon } from '@ionic/angular/standalone';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { grid, settings } from 'ionicons/icons';
import { LocalNotifications } from '@capacitor/local-notifications';
import { PushNotifications, Token, PermissionStatus, PushNotificationSchema, ActionPerformed } from '@capacitor/push-notifications';
addIcons({
  'grid': grid,
  'settings': settings
});

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonApp, IonToolbar, IonHeader, IonTitle, IonContent, RouterOutlet, RouterLink, CommonModule, FormsModule, IonRouterOutlet, IonButton, IonButtons, IonIcon],
})
export class HomePage {
  constructor(private router: Router) { }

  testNotification() {
    console.log("sending notification");
    LocalNotifications.schedule({
      notifications: [
        {
          title : "Title",
          body : "Body",
          id : 1
        }
      ]
    })
  }
}