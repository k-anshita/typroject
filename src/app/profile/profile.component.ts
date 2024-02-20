// import { keyframes } from '@angular/animations';
// import { Component } from '@angular/core';
// import { filter } from 'rxjs';

// @Component({
//   selector: 'app-profile',
//   templateUrl: './profile.component.html',
//   styleUrls: ['./profile.component.css']
// })
// export class ProfileComponent {
//   data: any[] = [];
//   data1: any[] = [];
//   pro: any[] = [];
//   username?: string;
//   password?: string;

//   constructor() {
//     this.profiledata();
//   }

//   profiledata() {
//     var data = localStorage.getItem('loginuser')
//     this.data1 = JSON.parse(data || '[]') || [];

//   }
// }


import { keyframes } from '@angular/animations';
import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { filter } from 'rxjs';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  data1: any[] = [
    { key: 'firstname', name: 'First name', type: 'input' },
    { key: 'lastname', name: 'Last name', type: 'input' },
    { key: 'email', name: 'Email', type: 'input' },
    { key: 'gender', name: 'Gender', type: 'radio', values: ['Male', 'Female'] },
    { key: 'date', name: 'Birth date', type: 'date' },
  ];
  profileData: any = {};
  isShowDeleteConfirmPopUp: boolean = true;

  constructor(
    private toastr: ToastrService,
    private authService: AuthService,
    private router: Router,
  ) {
  }

  ngOnInit() {
    this.profiledata();
  }

  profiledata() {
    let data = localStorage.getItem('loginuser')
    this.profileData = JSON.parse(data || '{}') || {};
    const date = new DatePipe('en-Us');
    this.profileData.date = date.transform(this.profileData.date, 'yyyy-MM-dd');
  }

  updateProfile() {
    if (this.data1.some(x => !this.profileData[x.key])) {
      this.toastr.warning('Please fill all details')
    } else {
      this.authService.updateProfile(this.profileData).subscribe(x => {

        this.toastr.success('Profile updated successfully!')
        localStorage.setItem('loginuser', JSON.stringify(x.data) || '')
      }
        , err => {
          this.toastr.error('Something went wrong, Please try again later!');
        }
      );
    }
  }

  deleteProfile() {
    if (!this.profileData.id) {
      this.toastr.warning('Please contact your admin, You can\'t delete your account.')
    } else {
      this.authService.deleteProfile(this.profileData.id).subscribe(x => {

        this.toastr.success('Profile deleted successfully!');
        localStorage.removeItem('loginuser')
        this.router.navigate(['/'])
      }
        , err => {
          this.toastr.error('Something went wrong, Please try again later!');
        }
      );
    }
  }
}
