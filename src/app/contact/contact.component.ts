import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
  name?: string
  email?: string
  subject?: string
  message?: string
  arr: any[] = [];



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
    } else if (this.subject == null || this.subject == '' || this.subject == undefined) {
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

}
