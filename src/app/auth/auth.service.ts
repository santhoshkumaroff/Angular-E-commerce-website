import { Injectable } from '@angular/core';
import { GoogleAuthProvider, signInWithPopup,AuthProvider ,getAuth, Auth, signInWithRedirect, signOut, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail } from '@angular/fire/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth'
import { Router } from '@angular/router';
import firebase from '@firebase/app-compat';
import 'firebase/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  res: Promise<void> | undefined;
  user$: any;
  // user$: Observable<User |null>;

  constructor(private auth: AngularFireAuth, private router: Router) {
    this.user$ = auth.authState;    
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
  async login(email: string, password: string) {
    const auth = getAuth();
    try {
      await signInWithEmailAndPassword(auth, email, password)
      .then((result) => {
        // Handle the successful sign-in
        localStorage.setItem('token', JSON.stringify(result.user?.uid));
        console.log('Signed in with Google:', result.user);
      })
      this.resetActivityTime();
    } catch (error) {
      console.log('Login error:', error);
      alert('Login failed');
      this.router.navigate(['/login']);
    }
  }
  
  // Register
  async registerdetails(email: string, password: string) {
    const auth = getAuth();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert('Registration successful!');
    } catch (error) {
      console.log('Registration error:', error);
      alert('Registration failed');
      this.router.navigate(['/register']);
    }
  }
  
  // Sign out
  async logout() {
    const auth = getAuth();
    try {
      await signOut(auth);
      localStorage.removeItem('token');
    } catch (error) {
      console.log('Logout error:', error);
      alert('Logout failed');
    }
  }

async  googleSignIn() {
  const auth = getAuth();
 await signInWithPopup(auth, new GoogleAuthProvider())
  .then((result) => {
    // Handle the successful sign-in
    localStorage.setItem('token', JSON.stringify(result.user?.uid));
    console.log('Signed in with Google:', result.user);
  })
  .catch((error) => {
    // Handle errors
    console.error('Google sign-in error:', error);
  });
  }
 async forgotPassword(email: string) {
    const auth = getAuth();
  await sendPasswordResetEmail(auth, email)
      .then((res) => {
        alert('reset successfull')
      })
      .catch((err) => {
        console.log('Password reset error:', err);
        alert('Something went wrong');
      });
  }

  get isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }
}
