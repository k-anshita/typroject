import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { OtpService } from '../otp.service';
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
    private router:Router) { }
    validateEmail(email: string): boolean {
      const emailPattern =   /^[^\.\s][\w\-]+(\.[\w\-]+)*@([\w-]+\.)+[\w-]{2,}$/;
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
   if(this.verificationStatus=='OTP Verified successfully!'){
    this.router.navigate(['/payment']);
   }
  
   
 
  }
}




