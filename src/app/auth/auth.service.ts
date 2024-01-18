import { Injectable } from '@angular/core';
import { GoogleAuthProvider, signInWithPopup,AuthProvider ,getAuth, Auth } from '@angular/fire/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth'
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  forgotPassword(email: string) {
    this.auth.sendPasswordResetEmail(email).then(() => {
      this.router.navigate(['/verify-email']);
    }, err => {
      alert('Something went wrong');
    })
  }

  constructor(private auth: AngularFireAuth, private router: Router) {
    this.lastActivityTime = Date.now();
    this.initializeAutoLogout();
    console.log('AuthService constructor called');
  }
  private lastActivityTime!: number;
  private initializeAutoLogout() {
    // Check for inactivity every minute (adjust as needed)
    setInterval(() => {
      if (this.shouldLogout()) {
        this.logout();
      }
    }, 60000); // 1 minute interval
  }
  private shouldLogout(): boolean {
    const inactiveTime = Date.now() - this.lastActivityTime;
    const inactivityThreshold = 600000; // 10 minutes in milliseconds

    return inactiveTime > inactivityThreshold;
  }

   resetActivityTime() {
    this.lastActivityTime = Date.now();
  }

  // login 
  login(email: string, password: string) {
    this.auth.signInWithEmailAndPassword(email, password).then(() => {
      localStorage.setItem('token', 'true');
      this.resetActivityTime();
      this.router.navigate(['/home'])
    }, err => {
      alert(err.message);
      this.router.navigate(['/login']);
    })
  }

  // Register

  register(email: string, password: string) {
    this.auth.createUserWithEmailAndPassword(email, password).then(() => {
      alert("Registration successfull !!!")
      this.router.navigate(['/login']);
    }, err => {
      alert(err.message);
      this.router.navigate(['/register'])
    })
  }

  // sign out

  logout() {
    this.auth.signOut().then(() => {
      localStorage.removeItem('token');
      this.router.navigate(['/home']);
    }, err => {
      alert(err.message)
    })
  }

  // Google sign in
  googleSignIn() {
    return this.auth.signInWithPopup(new GoogleAuthProvider).then(res => {
      localStorage.setItem('token', JSON.stringify(res.user?.uid));
      this.router.navigate(['/home']);

    }, err => {
      alert(err.message);
    })
  }
  get isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }
}
