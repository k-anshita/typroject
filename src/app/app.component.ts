import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  loginuser_data: any = {};
  @ViewChild('header') headerEle: ElementRef<HTMLElement> | undefined;
  @ViewChild('main') mainEle: ElementRef<HTMLElement> | undefined;

  constructor(private router: Router, private toastr: ToastrService) {
    this.user_data();
  }

  ngOnInit() {
    if (localStorage.getItem('loginuser') && location.pathname == '/') {
      // this.router.navigate(['/main'])
      this.router.navigate(['/home'])

    }
    this.router.events.subscribe((event) => {
      if (!(event instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0)
    });
  }



check_loginuser(){
  if (localStorage.getItem('loginuser')) {
    this.toastr.info('you are already log in!!');
  } else {
    this.router.navigate(['/'])
  }
}

logout() {
  localStorage.removeItem('loginuser')
  this.router.navigate(['/'])
  this.toastr.success('logout successfully!!')
}

user_data(){
  var users = localStorage.getItem('loginuser')
  this.loginuser_data = JSON.parse(users || '[]') || [];

}

resize() {
  if (this.mainEle?.nativeElement?.style) {
    this.mainEle.nativeElement.style.paddingTop = (this.headerEle?.nativeElement?.clientHeight || 0) + 'px';
  }
}
}

