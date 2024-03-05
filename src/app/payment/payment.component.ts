import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent {
  [x: string]: any;
  min?:number;
  max?:number;
  cardName: string = '';
  cardNumber?:any;
  iscardNameValid:boolean=true;
  iscardnumvalid:boolean=true;
  expiryYear:string='';
  cvv:string='';
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
    return this.validateExpiryYear(this.expiryYear);
  }

  validateCVV(cvv: string): boolean {
    return /^\d{3}$/.test(cvv);
  }
  
  onSubmit() 
  {
    if ((!this.cardName  && !this.iscardNameValid) && (!this.validateExpiryYear(this.expiryYear)  ) && (!this.cardNumber  && !this.iscardnumvalid ) &&(!this.cvv)) {
      console.log('form is invalid');
    }
    else
    {
      Swal.fire("your payment sunmitted successfully and RS.49 will be debited from your account");
    }
}

}

