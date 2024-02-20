import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-mainpage',
  templateUrl: './mainpage.component.html',
  styleUrls: ['./mainpage.component.css']
})
export class MainpageComponent {
 

  constructor(private router: Router, private toastr: ToastrService) { }

  logout() {
    localStorage.removeItem('loginuser')
    this.router.navigate(['/'])
    this.toastr.success('logout successfully!!')
  }

  
}
