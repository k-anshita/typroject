import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { OtpService } from '../otp.service';
import { AuthService } from '../auth.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.css']
})
export class OtpComponent {

  title = 'demopayment';
  email: string = '';
  otpCode: string = '';
  otpSent: boolean = false;
  verificationStatus: string = '';
  openpage: boolean = false;
  abc?: any;

  constructor(private otpService: OtpService,
    private router: Router,
    private authService: AuthService,
    private toastr: ToastrService) { }
  validateEmail(email: string): boolean {
    const emailPattern = /^[^\.\s][\w\-]+(\.[\w\-]+)*@([\w-]+\.)+[\w-]{2,}$/;
    return emailPattern.test(email);
  }

  sendOTP() {
    this.otpService.sendOTP(this.email)
      .then(() => {
        this.otpSent = true;
      })
      .catch(() => {
        // Handle error
      });
    if (!String(this.email || '').trim()) {
      this.toastr.warning('please fill the email')
    } else {
      const obj = {
        email: this.email,
      }
      this.authService.email(obj).subscribe(x => {
        console.log(x);
      })
    }
  }

  verifyOTP() {
    this.otpService.verifyOTP(this.otpCode)
      .subscribe(isCorrect => {
        if (isCorrect) {
          this.verificationStatus = 'OTP Verified successfully!';
          this.abc = isCorrect;
        } else {
          this.verificationStatus = 'Invalid OTP!';
        }
      });
  }
  clickme() {
    if (this.verificationStatus == 'OTP Verified successfully!') {
      this.router.navigate(['/payment']);
    }



  }
}




