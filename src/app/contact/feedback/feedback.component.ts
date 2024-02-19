import { Component, OnInit } from '@angular/core';
import { IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonTextarea, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { close} from 'ionicons/icons';
import { addIcons } from 'ionicons';

addIcons({
  'close': close
});
@Component({
  selector: 'app-feedback',
  standalone: true,
  imports: [IonHeader, IonToolbar, IonTitle, IonButton, IonButtons, IonIcon, IonContent, IonTextarea, CommonModule, FormsModule],
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.scss'],
})
export class FeedbackComponent  implements OnInit {
  feedback: string = '';

  constructor(private dialogRef: MatDialogRef<FeedbackComponent>) { }

  ngOnInit() {}

  ionViewDidEnter() {
    this.calculateModalHeight();
  }

  calculateModalHeight() {
    const ionContent = document.querySelector('ion-content');
    const contentHeight = ionContent?.scrollHeight;
    if (ionContent && contentHeight) {
      ionContent.style.height = contentHeight + 'px';
    }
  }

  closeModal() {
    this.dialogRef.close();
  }

  submitFeedback() {
    console.log('Feedback submitted:', this.feedback);
    this.dialogRef.close({ result : this.feedback });
  }
}
