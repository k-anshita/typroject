import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import emailjs, { type EmailJSResponseStatus } from '@emailjs/browser';
import Swal from 'sweetalert2';
@Injectable({
  providedIn: 'root'
})
export class OtpService {

  private correctOTP: any; // Store the correct OTP
  private otpVerificationSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor() { }

  sendOTP(email: string): Promise<void> {
    // Generate OTP
    const otp = this.generateOTP();

    // Store the generated OTP
    this.correctOTP = otp;

    // Send OTP via email
    const templateParams = {
      to_email: email,
      otp: otp
    };
    return emailjs.send('service_8xoz4ip', 'template_fw5f4im', templateParams, 'h4_Qofw0LD4eGhA9L')
      .then(() => {
        Swal.fire('OTP Sent successfully!');
      })
      .catch((error) => {
        console.error('Error sending OTP:', error);
        Swal.fire('problem occurs:-',error);
        throw error;
      });
  }

  verifyOTP(otpCode: string): Observable<boolean> {
    // Simulate asynchronous OTP verification process
    setTimeout(() => {
      const isCorrect = otpCode === this.correctOTP;
      this.otpVerificationSubject.next(isCorrect);
    }, 1000); // Simulate delay

    return this.otpVerificationSubject.asObservable();
  }

  private generateOTP(length: number = 6): string {
    let otp = '';
    const characters = '0123456789'; // You can include letters if you want alphanumeric OTPs
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      otp += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return otp;
  }
}

