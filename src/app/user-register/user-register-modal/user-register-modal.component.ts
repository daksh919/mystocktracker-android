import { Component, OnInit } from '@angular/core';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink} from '@angular/router';
import { StoreFetchDataComponent } from 'src/app/dashboard/store-fetch-data/store-fetch-data.component';

@Component({
  selector: 'app-user-register-modal',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './user-register-modal.component.html',
  styleUrl: './user-register-modal.component.css'
})
export class UserRegisterModalComponent implements OnInit{
  email: string = '';
  password: string = '';
  successMessage: string = '';

  constructor(private router: Router,private localData: StoreFetchDataComponent) { }

  ngOnInit(): void {
    const currentUser = this.localData.getUserLoginId();
    if(currentUser != null && currentUser != undefined && currentUser != ""){
      this.router.navigate(['home']);
    }
  }

  register() {
    const auth = getAuth();
    console.log("Registering user with username "+this.email+" and password "+this.password)
    createUserWithEmailAndPassword(auth, this.email, this.password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log("User has been registered successfully " + JSON.stringify(user));
        this.successMessage = 'User registered successfully. You can now login.';
        this.redirectToLogin();
        this.email = '';
        this.password = '';
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(error.message);
        this.successMessage = 'Registration unsuccessful, please try again';
      });
  }
  redirectToLogin(){
    this.router.navigate(['login']);
  }
}
