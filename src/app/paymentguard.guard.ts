import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { OtpService } from './otp.service';
import {  Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PaymentguardGuard implements CanActivate {
  constructor(private OtpService: OtpService, private router: Router) {}

  canActivate(): boolean {
    if (this.OtpService.getPaymentStatus()) {
      return true; // Allow navigation
    } else {
      this.router.navigate(['/otp']); // Redirect to payment page
      return false; // Prevent navigation
    }
  }
}
