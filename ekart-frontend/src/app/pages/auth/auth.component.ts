import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  isLoginTab = true;
  returnUrl = '/home';
  redirectReason = '';

  loginData = {
    email: '',
    password: ''
  };

  registerData = {
    name: '',
    email: '',
    password: '',
    phone: '',
    role: 'ROLE_USER' // Only customers can register
  };

  loading = false;
  errorMessage = '';
  successMessage = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if (params['returnUrl']) {
        this.returnUrl = params['returnUrl'];
      }
      if (params['reason']) {
        this.redirectReason = params['reason'];
      }
    });
  }

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
      if (res.success && res.data) {
        this.successMessage = res.message;
        const isStaff = res.data.role === 'ROLE_ADMIN' || res.data.role === 'ROLE_DELIVERY' || res.data.role === 'ROLE_DELIVERY_BOY';
        const targetUrl = isStaff ? '/order-tracker' : this.returnUrl;
        setTimeout(() => this.router.navigateByUrl(targetUrl), 800);
      } else {
        this.errorMessage = res.message || 'Login failed.';
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
    this.registerData.role = 'ROLE_USER'; // Customer signup only

    this.authService.register(this.registerData).subscribe(res => {
      this.loading = false;
      if (res.success) {
        this.successMessage = res.message;
        setTimeout(() => this.router.navigateByUrl(this.returnUrl), 800);
      } else {
        this.errorMessage = res.message;
      }
    });
  }
}
