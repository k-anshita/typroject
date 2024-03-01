import { JsonPipe } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../auth.service';
import { NgForm } from '@angular/forms';
// Custom validator function

@Component({
  selector: 'app-resigster',
  templateUrl: './resigster.component.html',
  styleUrls: ['./resigster.component.css']
})
export class ResigsterComponent {
  firstname?: string
  lastname?: string
  username?: string
  password?: string
  gender?: string
  date?: string
  arr: any[] = [];
  firstName: string = '';
  lastName: string = '';
  isFirstNameValid: boolean = true;
  isLastNameValid: boolean = true;
  email: string = '';
  maxDate:any;
  dateOfBirth: any; // Store date of birth as string
  minDate: string; // Store minimum date as string
  validateFirstName(value: string) {
    // Validate first name here
    this.isFirstNameValid = /^[a-zA-Z]+$/.test(value);
  }

  validateLastName(value: string) {
    // Validate last name here
    this.isLastNameValid = /^[a-zA-Z]+$/.test(value);
  }
  validateEmail(email: string): boolean {
    const emailPattern = /^[a-z]+(\.[a-z]+)*@([a-z]+\.)+[a-z]{2,}$/;
    return emailPattern.test(email);
  }
  
  calculateAge(birthDateString: string): number {
    const birthDate = new Date(birthDateString); // Convert string to Date object
    const today = new Date();
    const diff = today.getTime() - birthDate.getTime();
    const age = Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25));
    return age;
  }

  onSubmit() {
    const age = this.calculateAge(this.dateOfBirth);
    if (age >= 5) {
      console.log('Form submitted successfully');
      // Proceed with form submission
    } else {
      console.log('Age must be greater than or equal to 5 years');
      // Display error message or prevent form submission
    }
    if (this.firstName && this.lastName && this.isFirstNameValid && this.isLastNameValid) {
      console.log('Form submitted successfully');
      console.log(this.firstName);
      // You can perform further actions here, like sending the form data to a server
    } else {
      console.log('Form is invalid');
    }
    if (this.validateEmail(this.email)) {
      console.log('Form submitted with email:', this.email);
      // You can perform further actions here, such as submitting the form data to a server
    } else {
      console.log('Please enter a valid email address.');
    }
  }
  
  constructor(public router: Router,
    private toastr: ToastrService,
    private authService: AuthService) {
       // Setting the minimum date (5 years ago from today)
    const today = new Date();
    today.setFullYear(today.getFullYear() - 5);
    this.minDate = today.toISOString().split('T')[0];
  
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
