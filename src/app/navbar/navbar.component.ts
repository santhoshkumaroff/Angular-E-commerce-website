import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{
  isBarsIconVisible: any;
  mobmenu: boolean = false;
  ngOnInit(): void {
    this.checkScreenWidth();
  }
  isMobile: boolean = false;
  sidebar :boolean = false;
  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    this.checkScreenWidth();
  }

  checkScreenWidth(): void {
    this.isMobile = window.innerWidth <= 720;
  } 
  get isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

}
