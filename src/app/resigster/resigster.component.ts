import { JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-resigster',
  templateUrl: './resigster.component.html',
  styleUrls: ['./resigster.component.css']
})
export class ResigsterComponent {
  firstname?: string
  lastname?: string
  email?: string
  username?: string
  password?: string
  gender?: string
  date?: string
  arr: any[] = [];
  


  constructor(public router: Router,
    private toastr: ToastrService,
    private authService: AuthService) {
  }

  add() {
    var userdetail = localStorage.getItem('userdetail')
    this.arr = JSON.parse(userdetail || '[]') || []
    const userinfo = this.arr.find(x => x.username == this.username && x.email && this.email)
    if (userinfo) {
      this.toastr.warning('this.password and username is declared!')
    } else if (this.firstname == null || this.firstname == '' || this.firstname == undefined) {
      this.toastr.warning('please fill the firstname')
    } else if (this.lastname == null || this.lastname == '' || this.lastname == undefined) {
      this.toastr.warning('please fill the lastname')
    } else if (this.email == null || this.email == '' || this.email == undefined) {
      this.toastr.warning('please fill the email')
    } else if (this.username == null || this.username == '' || this.username == undefined) {
      this.toastr.warning('please fill the username')
    } else if (this.password == null || this.password == '' || this.password == undefined) {
      this.toastr.warning('please fill the password')
    } else if (this.gender == null || this.gender == '' || this.gender == undefined) {
      this.toastr.warning('please fill the gender')
    } else if (this.date == null || this.date == '' || this.date == undefined) {
      this.toastr.warning('please fill the date')
    } else {

      const obj = {
        firstname: this.firstname,
        lastname: this.lastname,
        email: this.email,
        username: this.username,
        password: this.password,
        gender: this.gender,
        date: this.date
      }
      this.authService.register(obj).subscribe(x => {
        // if(x.code == 200 && x.isSuccess){

        // }
        this.router.navigate(['/'])
        this.firstname = '',
          this.lastname = '',
          this.email = '',
          this.username = '',
          this.password = '',
          this.gender = '',
          this.date = ''
      }
      // else{
      //   this.toastr.error(x.message)

      // })
        , err => {
          this.toastr.error('error in register')
        })
    
    }
  }
}
