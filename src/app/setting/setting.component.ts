import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { FeedbackComponent } from '../contact/feedback/feedback.component';
import emailjs from '@emailjs/browser';

interface FAQ {
  question: string;
  answer: string;
  showAnswer: boolean;
}

@Component({
  selector: 'app-setting',
  standalone: true,
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, CommonModule, FormsModule],
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.scss'],
})

export class SettingComponent implements OnInit {
  userName: string;
  userEmail: string;
  userMobile: string;
  accessToken: string

  editMode: boolean = false;
  editedName: string = '';
  editedMobile: string = '';
  editedToken: string = '';

  faqs = [
    {
      question: 'How to set access token?',
      answer: 'Please visit "https://eodhd.com/login" website and register yourself. After registering, in setting page "https://eodhd.com/cp/settings"'
        + ' you will see a API TOEKN field, copy and paste that here.',
      photos: ['/assets/apiToken.png'],
      showAnswer: false
    },
    {
      question: 'Does the access token get expired?',
      answer: 'Yes, you get only 20 API calls per day and 500 extra calls for lifetime. Each time you load table with real time data checkbox ticked,' +
        'one request is being used for one stock symbol.(Eg. if you have 5 stocks in your portfolio and you track stock woth real time data, 5 API calls will be used)',
      showAnswer: false
    },
    {
      question: 'What to do after token is expired?',
      answer: 'Dont worry, if you token gets expired you just have to register yourself again on the same webiste to get new token. ' +
        'You can reuse you email id again as well(lets say your id is daksh899@gmail.com, next time you can use daksh899+1@gmail.com). ' +
        'Isn\'t this a nice trick.',
      showAnswer: false
    },
  ];

  toggleAnswer(faq: FAQ): void {
    faq.showAnswer = !faq.showAnswer;
  }

  constructor(private router: Router, public dialog: MatDialog) { }

  ngOnInit() {
    let email = localStorage.getItem("LoggedInUser") != null ? localStorage.getItem("LoggedInUser") : "";
    let token = localStorage.getItem("accessToken") != null ? localStorage.getItem("accessToken") : "";
    this.accessToken = token != null ? token : "";
    this.userEmail = email != null ? email.substring(1, email.length - 1) : "";
    this.userMobile = "9024434446"
  }

  toggleEditMode() {
    this.editMode = !this.editMode;
      this.editedName = this.userName;
      this.editedMobile = this.userMobile;
      this.editedToken = this.accessToken;
  }
  saveChanges() {
    const mobileRegex = /^[0-9]+$/;
    if (!mobileRegex.test(this.editedMobile) || this.editedMobile.length != 10) {
      window.alert('Please enter a valid mobile number.');
      return;
    }

    localStorage.setItem("accessToken", this.editedToken);
    this.userName = this.editedName;
    this.userMobile = this.editedMobile;
    this.accessToken = this.editedToken
    this.editMode = false;
  }

  feedback(): void {
    const dialogRef = this.dialog.open(FeedbackComponent, {
      width: '80%',
      disableClose: false
    });

    dialogRef.afterClosed().subscribe((result:any) => {
      this.sendMail(JSON.parse(JSON.stringify(result)).result)
    });
  }

  signout() {
    localStorage.removeItem("LoggedInUser");
    this.router.navigate(['']);
  }

  sendMail(customMessage: string) {
    emailjs.init('YSJlh2C-VG95xHJZh')
    emailjs.send("service_gh96qgn", "template_2yu4yw9", {
      from_name: this.userEmail,
      to_name: "Dushyant",
      website_name: "StockTracker",
      message: customMessage,
    });
  }
}
