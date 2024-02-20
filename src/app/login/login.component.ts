import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  firstname?: string;
  email?: string;
  username?: string;
  password?: string;
  data: any[] = [];
  // data1: any[] = [];
  update_data?: any;
  // router?:any

  // add() {
  //   var logindetail = localStorage.getItem('userDetail')
  //   const arr = JSON.parse(logindetail || '[]') || [];
  //   const obj = {

  //     firstname: this.firstname,
  //     password: this.password,
  //     email: this.email
  //   }
  //   arr.push(obj);
  //   localStorage.setItem('logindetail', JSON.stringify(arr) || '')
  // }

  constructor(public router: Router,
    private authService: AuthService,
    private toastr: ToastrService) { }


  check() {

    if (this.username == '') {
      this.toastr.warning('please fill the username')
    } else if (this.password == '') {
      this.toastr.warning('please fill the password')
    } else {
      var detail = localStorage.getItem('userdetail')
      this.data = JSON.parse(detail || '[]') || [];

      const obj = {
        username: this.username,
        password: this.password
      }

      // const loginuserinfo = this.data.find(x => x.username == this.username && x.password == this.password)
      // if (loginuserinfo) {
        // this.router.navigate(['/main'])
        this.authService.login(this.username!, this.password!).subscribe(x => {

          this.router.navigate(['/home'])
          this.toastr.success('login successfully!')
          localStorage.setItem('loginuser', JSON.stringify(x.data) || '')
        }
        , err => {
          this.toastr.error('your username or password wrong!');
        }
        )

        // else {
        //   this.toastr.error('login cancel!please try again')
        // }
      // }
      this.username = '';
      this.password = '';
    }
  }


}