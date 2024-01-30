import { Component } from '@angular/core';
import{AuthService} from '../auth/auth.service'
import { Router } from '@angular/router';
@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent {
  constructor(private auth:AuthService ,private router:Router){}
  logout(){
    this.auth.logout().then((res) =>{
      this.router.navigate(['/']);
      console.log("login done");
      
    }).catch((err) =>{
      alert(err.message)
    });
  }
}
