import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  passwordsDoNotMatch: boolean = false;
  passwordTooWeak: boolean = false;

  constructor(private auth: AuthService,private router:Router) { }
  inputType: string = 'password';

  togglePasswordVisibility() {
    this.inputType = this.inputType === 'password' ? 'text' : 'password';
  }

  ngOnInit(): void {
  }

  checkPasswordStrength() {
    // Check if the password meets the minimum length requirement
    this.passwordTooWeak = this.password.length < 6;
  }

  register() {
    if (this.email === '') {
      alert('Please enter email');
      return;
    }

    if (this.password === '') {
      alert('Please enter password');
      return;
    }

    if (this.password !== this.confirmPassword) {
      // Set the flag to display the error message
      this.passwordsDoNotMatch = true;
      return;
    }

    // Reset the error flag
    this.passwordsDoNotMatch = false;
    this.passwordTooWeak = false;


    this.checkPasswordStrength();

    if (this.passwordsDoNotMatch || this.passwordTooWeak) {
      // Set the corresponding flags to display error messages
      this.passwordsDoNotMatch = this.password !== this.confirmPassword;
      this.passwordTooWeak = this.password.length < 6;
      return;
    }

    this.auth.registerdetails(this.email, this.password).then((res) =>{
      this.router.navigate(['/login']);
      console.log("Google SignedIn");
      
    }).catch((err) =>{
      alert(err.message)
    })
    this.email = '';
    this.password = '';
    this.confirmPassword = '';
  }
  checkPasswordMatch() {
    // Check if passwords match in real-time
    this.passwordsDoNotMatch = this.password !== this.confirmPassword;
  }

 
}