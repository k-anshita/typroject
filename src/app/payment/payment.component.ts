import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { AuthService } from '../auth.service';
import { OtpService } from '../otp.service';

declare var Razorpay: any;
@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'],
  
})
export class PaymentComponent implements OnInit {
  showPaymentButton?: boolean;
  constructor(private cdr: ChangeDetectorRef,private OtpService:OtpService) {}

  ngOnInit() {
    // Retrieve the state of showPaymentButton from localStorage
    const showPaymentButtonState = localStorage.getItem('showPaymentButton');
    this.showPaymentButton = showPaymentButtonState ? JSON.parse(showPaymentButtonState) : true;
  }

  payNow() {
    const RozarpayOptions = {
      description: 'Sample Razorpay demo',
      currency: 'INR',
      amount: 4900,
      name: 'online gamezone',
      key: 'rzp_test_iugwyatZzUBIId',
      prefill: {
        name: '',
        email: '',
        phone: ''
      },
      theme: {
        color: '#6466e3'
      },
      handler: (response: any) => {
        this.paymentCallback(response);
      },
      modal: {
        ondismiss:  () => {
          console.log('dismissed')
        }
      }
    };

    Razorpay.open(RozarpayOptions);
  }

  paymentCallback(response: any) {
    console.log('Payment successful:', response);
    this.showPaymentButton = false;
    localStorage.setItem('showPaymentButton',JSON.stringify(this.showPaymentButton))
    this.cdr.detectChanges();
    
  this.OtpService.setPaymentStatus(true);
  
    Swal.fire({
      title: 'Payment successful',
      text: 'Thank you for your payment!',
      icon: 'success',
      confirmButtonText: 'OK'
    });
  }

  failureCallback(error: any) {
    console.log('Payment failed:', error);
    Swal.fire({
      title: 'Payment failed',
      text: 'Sorry, your payment could not be processed.',
      icon: 'error',
      confirmButtonText: 'OK'
    });
  }
}
