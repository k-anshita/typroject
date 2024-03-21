import { Component } from '@angular/core';
import { OtpService } from '../otp.service';
@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.css']
})
export class GamesComponent {

  paymentSuccessful: boolean;

  constructor(private OtpService : OtpService) {
    this.paymentSuccessful = this.OtpService.getPaymentStatus();
  }
}
