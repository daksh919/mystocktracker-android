import { Component, Inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonContent, IonIcon } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { logoInstagram, logoFacebook, mail} from 'ionicons/icons';

addIcons({
  'logo-instagram': logoInstagram,
  'logo-facebook': logoFacebook,
  'mail': mail
});

@Component({
  selector: 'app-contact-details',
  standalone: true,
  imports: [IonButton, RouterLink, IonContent, IonCard, IonCardHeader, IonCardTitle, IonIcon, IonCardContent],
  templateUrl: './contact-details.component.html',
  styleUrl: './contact-details.component.css'
})
export class ContactDetailsComponent {
  constructor() {}
}
