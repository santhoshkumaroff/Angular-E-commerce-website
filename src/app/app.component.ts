import { Component,HostListener } from '@angular/core';
import { AuthService} from '../app/auth/auth.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Devis_Masala';

  constructor(private authService: AuthService) {}

  @HostListener('document:mousemove')
  @HostListener('document:keypress')
  onUserActivity() {
    this.authService.resetActivityTime();
  }
}
