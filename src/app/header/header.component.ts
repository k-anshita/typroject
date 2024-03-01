import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  loginuser_data: any = {};
  openmenu: boolean = false;
  // @ViewChild('header') headerEle: ElementRef<HTMLElement> | undefined;
  // @ViewChild('main') mainEle: ElementRef<HTMLElement> | undefined;

  constructor(private router: Router, private toastr: ToastrService) {
    this.user_data();
  }

  ngOnInit() {
    if (localStorage.getItem('loginuser') && location.pathname == '/') {
      // this.router.navigate(['/main'])
      this.router.navigate(['/home'])

    }

  }

  toggleMenu() {
    this.openmenu = !this.openmenu;
  }

  myFunction(): void {
    const x = document.getElementById("myTopnav") as HTMLElement | null;

    if (x && x.className === "navbar-toggler") {
      x.className += " responsive";
    } else if (x) {
      x.className = "navbar-toggler";
    }
  }

  check_loginuser() {
    if (localStorage.getItem('loginuser')) {
      this.toastr.warning('you are already log in!!');
    } else {
      this.router.navigate(['/'])
    }
  }

  logout() {
    // localStorage.removeItem('loginuser')
    localStorage.clear();
    this.router.navigate(['/'])
    this.toastr.success('logout successfully!!')
  }

  user_data() {
    var users = localStorage.getItem('loginuser')
    this.loginuser_data = JSON.parse(users || '[]') || [];

  }

  resize() {
    // if (this.mainEle?.nativeElement?.style) {
    //   this.mainEle.nativeElement.style.paddingTop = (this.headerEle?.nativeElement?.clientHeight || 0) + 'px';
    // }
  }
}
