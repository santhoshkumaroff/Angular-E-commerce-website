import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email : string = '';
  password : string = '';

  constructor(private auth : AuthService, private router:Router) { 
    console.log('LoginComponent constructor called');
  }
  inputType: string = 'password';

  togglePasswordVisibility() {
    this.inputType = this.inputType === 'password' ? 'text' : 'password';
  }
  ngOnInit(): void {
  }

  login() {

    if(this.email == '') {
      alert('Please enter email');
      return;
    }

    if(this.password == '') {
      alert('Please enter password');
      return;
    }

    this.auth.login(this.email,this.password).then((res) =>{
      this.router.navigate(['/']);
      console.log("login done");
      
    }).catch((err) =>{
      alert(err.message)
    });
    
    this.email = '';
    this.password = '';

  }

  signInWithGoogle() {
    this.auth.googleSignIn().then((res) =>{
      this.router.navigate(['/']);
      console.log("Google SignedIn");
      
    }).catch((err) =>{
      alert(err.message)
    })
  }

 
}