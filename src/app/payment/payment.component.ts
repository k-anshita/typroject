import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent {
  [x: string]: any;
  min?: number;
  max?: number;
  cardName: string = '';
  cardNumber?: any;
  iscardNameValid: boolean = true;
  iscardnumvalid: boolean = true;
  expYear: string = '';
  expMonth: string = '';
  cvv: string = '';

  constructor(private toastr: ToastrService, private authService: AuthService) { }
  validatecardName(value: string) {
    // Validate first name here
    this.iscardNameValid = /^[a-zA-Z]+$/.test(value);
  }
  validatecardnum(value: string) {
    // Validate first name here
    this.iscardnumvalid = /^\d{16}$/.test(value);
  }

  validateExpiryYear(year: string): boolean {
    const currentYear = new Date().getFullYear();
    const inputYear = parseInt(year, 10);
    return /^\d{4}$/.test(year) && inputYear >= currentYear;
  }
  isValidExpiryYear(): boolean {
    return this.validateExpiryYear(this.expYear);
  }

  validateCVV(cvv: string): boolean {
    return /^\d{3}$/.test(cvv);
  }

  onSubmit() {
    if ((!this.cardName && !this.iscardNameValid) && (!this.validateExpiryYear(this.expYear)) && (!this.cardNumber && !this.iscardnumvalid) && (!this.cvv)) {
      console.log('form is invalid');
    }
    else {
      Swal.fire("your payment sunmitted successfully and RS.49 will be debited from your account");
    }
  }

  add() {
    if (!String(this.cardName || '').trim() || !String(this.cardNumber || '').trim() || !String(this.expYear || '').trim() || !String(this.expMonth || '').trim() || !String(this.cvv || '').trim()) {
      this.toastr.warning('All fields are compulsory');
    } else {
      const obj = {
        cardName: this.cardName,
        cardNumber: this.cardNumber,
        expYear: this.expYear,
        expMonth: this.expMonth,
        cvv: this.cvv
      }
      this.authService.payment(obj).subscribe(x => {
        console.log(x);
      })

    }
  }

}

