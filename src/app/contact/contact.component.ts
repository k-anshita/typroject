import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../auth.service';
import { NgForm } from '@angular/forms';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
  name?: string
  email: string='';
  subject?: string
  message?: string
  arr: any[] = [];
  isNameValid:boolean=true;


  constructor(public router: Router,
    private toastr: ToastrService,
    private authService: AuthService) {
  }

  submit_review() {
    // var userdetail = localStorage.getItem('abc')
    // this.arr = JSON.parse(userdetail || '[]') || []
    // const userinfo = this.arr.find(x => x.username == this.username && x.email && this.email)
    if (this.name == null || this.name == '' || this.name == undefined) {
      this.toastr.warning('please fill the name')
    } else if (!String(this.subject||'').trim()){
      this.toastr.warning('please fill the subject')
    } else if (this.email == null || this.email == '' || this.email == undefined) {
      this.toastr.warning('please fill the email')
    } else if (this.message == null || this.message == '' || this.message == undefined) {
      this.toastr.warning('please fill the message')
    } else {

      const obj = {
        name: this.name,
        email: this.email,
        subject: this.subject,
        message: this.message,
      }
      // localStorage.setItem('abc', JSON.stringify(obj) || '')
      this.authService.review(obj).subscribe(x => {

        this.toastr.success('Thanks for the review!!')
      }
        , err => {
          this.toastr.error('please try again!!');
        }
      )

      // else {
      //   this.toastr.error('login cancel!please try again')
      // }
      // }
      this.name = '';
      this.email = '';
      this.message = '';
      this.subject = '';
    }
  }

  validateName(value: string) {
    // Validate first name here
    this.isNameValid = /^[a-zA-Z]+$/.test(value);
  }
  validateEmail(email: string): boolean {
    const emailPattern =  /^[^\.\s][\w\-]+(\.[\w\-]+)*@([\w-]+\.)+[\w-]{2,}$/;
    return emailPattern.test(email);
  }
onSubmit(){

}
}
function trim(): any {
  throw new Error('Function not implemented.');
}

