import { Component } from '@angular/core';
import{AuthService} from '../auth/auth.service'
@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent {
  constructor(private auth:AuthService){}
  logout(){
    this.auth.logout()
  }
}
