import { Injectable } from '@angular/core';
import { GoogleAuthProvider, signInWithPopup,AuthProvider ,getAuth, Auth, signInWithRedirect } from '@angular/fire/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth'
import { Router } from '@angular/router';
import firebase from '@firebase/app-compat';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  res: Promise<void> | undefined;
  // user$: Observable<User |null>;

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
    if (!this.isLoggedIn) {
      return false;  // No need to logout if the user is not logged in
    }
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
      console.log("Login");
      alert("Login");
      this.router.navigate(['/login']);
    })
  }

  // Register

  register(email: string, password: string) {
    this.auth.createUserWithEmailAndPassword(email, password).then(() => {
      alert("Registration successfull !!!")
      this.router.navigate(['/login']);
    }, err => {
      console.log("register");
      
      alert("Register");
      this.router.navigate(['/register'])
    })
  }

  // sign out

  logout() {
    this.auth.signOut().then(() => {
      localStorage.removeItem('token');
      this.router.navigate(['/home']);
    }, err => {
      console.log("logout");
      
      alert("Logout")
    })
  }

  // Google sign in
  // googleSignIn() {
  //   const provider = new firebase.auth.GoogleAuthProvider();
  //   const popup = this.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider()).then(res => {
  //     localStorage.setItem('token', JSON.stringify(res.user?.uid));
  //     this.router.navigate(['/home']);
  //   }, err => {
  //     console.log("Error Google SignIn"); 
  //   })
  //   return popup;
  // }

 async googleSignIn() {
  this.auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider());
  // const provider = new firebase.auth.GoogleAuthProvider();
  //   return this.auth.signInWithPopup(provider)
  //     .then((res) => {
  //       localStorage.setItem('token', JSON.stringify(res.user?.uid));
  //       this.router.navigate(['/home']);
  //     });



    // var userCred = await this.auth.getRedirectResult();
    // console.log(userCred);
    
    // var userCred = await firebase.auth().signInWithPopup(
    //   new firebase.auth.GoogleAuthProvider());
    // const provider = new firebase.auth.GoogleAuthProvider();
    // return this.auth.signInWithPopup(provider)
    //   .then((res) => {
    //     localStorage.setItem('token', JSON.stringify(res.user?.uid));
        // this.router.navigate(['/home']);
    //   })
    //   .catch((err) => {
    //     console.log("G with signin");
        
    //     if (err.code === 'auth/popup-closed-by-user') {
    //       console.log('Authentication popup closed by the user');
    //     } else {
    //       console.error("Authentication ",err);
    //     }
    //   });
  }
  forgotPassword(email: string) {
    this.auth.sendPasswordResetEmail(email).then(() => {
      this.router.navigate(['/verify-email']);
    }, err => {
      console.log("Forget pass");
      
      alert('Something went wrong');
    })
  }

  get isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }
}
