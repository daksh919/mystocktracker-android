import { Component } from '@angular/core';
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';

@Component({
  selector: 'app-user-forgotpassword-modal',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './user-forgotpassword-modal.component.html',
  styleUrl: './user-forgotpassword-modal.component.css'
})
export class UserForgotpasswordModalComponent {
  email = '';
  password = '';

  constructor(private router: Router) {}

  forgotPassword() {
    let email = this.email;
    const auth = getAuth();
    sendPasswordResetEmail(auth, email)
      .then(() => {
        console.log("Password reset link has been sent");
        this.redirectToLogin();
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });
  }

  redirectToLogin(){
    this.router.navigate(['login']);
  }
}
