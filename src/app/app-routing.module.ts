import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MasalaListComponent } from './masala-list/masala-list.component';
import { NavbarComponent } from './navbar/navbar.component';

const routes: Routes = [
  {
    path: 'home', component : HomeComponent
  },
  {
    path:'', component : HomeComponent
  },
  {
    path:'masala', component : MasalaListComponent

  },
  {
    path:'navbar', component : NavbarComponent

  }  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
