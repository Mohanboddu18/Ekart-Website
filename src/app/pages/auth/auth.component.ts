import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent {
  isLoginTab = true;

  loginData = {
    email: '',
    password: ''
  };

  registerData = {
    name: '',
    email: '',
    password: '',
    phone: ''
  };

  loading = false;
  errorMessage = '';
  successMessage = '';

  constructor(private authService: AuthService, private router: Router) {}

  switchTab(isLogin: boolean) {
    this.isLoginTab = isLogin;
    this.errorMessage = '';
    this.successMessage = '';
  }

  onLogin() {
    if (!this.loginData.email || !this.loginData.password) {
      this.errorMessage = 'Please enter both email and password.';
      return;
    }

    this.loading = true;
    this.errorMessage = '';
    this.authService.login(this.loginData).subscribe(res => {
      this.loading = false;
      if (res.success) {
        this.successMessage = res.message;
        setTimeout(() => this.router.navigate(['/home']), 800);
      } else {
        this.errorMessage = res.message;
      }
    });
  }

  onRegister() {
    if (!this.registerData.name || !this.registerData.email || !this.registerData.password) {
      this.errorMessage = 'Please fill out all required fields.';
      return;
    }

    this.loading = true;
    this.errorMessage = '';
    this.authService.register(this.registerData).subscribe(res => {
      this.loading = false;
      if (res.success) {
        this.successMessage = res.message;
        setTimeout(() => this.router.navigate(['/home']), 800);
      } else {
        this.errorMessage = res.message;
      }
    });
  }
}
