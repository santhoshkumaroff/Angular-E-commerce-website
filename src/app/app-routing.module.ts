import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MasalaListComponent } from './masala-list/masala-list.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ContactComponent } from './contact/contact.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { AboutComponent } from './about/about.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { VerifyEmailComponent } from './verify-email/verify-email.component';
import { ForgotPasswordComponent } from './auth/forgot-password/forgot-password.component';
import { AccountComponent } from './account/account.component';

const routes: Routes = [
  {
    path: '', component: HomeComponent
  },
  {
    path: '', redirectTo: 'home', pathMatch: 'full'
  },
  {
    path: 'login', component: LoginComponent
  },
  {
    path: 'register', component: RegisterComponent
  },
  {
    path: 'products', component: MasalaListComponent
  },
  {
    path: 'navbar', component: NavbarComponent
  },
  {
    path: 'contact', component: ContactComponent
  },
  // {
  //   path: 'product-detail', component: ProductDetailComponent
  // },
  { 
    path: 'products/:productName', component: ProductDetailComponent 
  },
  {
    path: 'about', component: AboutComponent
  },
  {
    path: 'verify-email', component: VerifyEmailComponent
  },
  {
    path: 'forgot-password', component: ForgotPasswordComponent
  },
  {
    path:'account', component:AccountComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
