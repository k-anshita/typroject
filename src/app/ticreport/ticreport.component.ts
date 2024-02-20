import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-ticreport',
  templateUrl: './ticreport.component.html',
  styleUrls: ['./ticreport.component.css']
})
export class TicreportComponent {
  tic_winner?: any[] = [];
  userwinner_id: any[] = [];
  message?: string;
  userId?: string;

  constructor(private authService: AuthService, private toastr: ToastrService) {
    var login = localStorage.getItem('loginuser')
    var current_loginuser = JSON.parse(login || '[]') || [];

    var winner = localStorage.getItem('tic-toe winner')
    this.userwinner_id = JSON.parse(winner || '[]') || [];
    this.tic_winner = this.userwinner_id.filter(x => x.id == current_loginuser.username)
    // this.authService.ticgames(this.message!, this.userId!).subscribe(x => {
    //   this.toastr.success("success")

    // })
  }

  ngOnInit() {
    this.get_histrory()
  }


  get_histrory() {

    var login = localStorage.getItem('loginuser')
    var current_loginuser = JSON.parse(login || '{}') || {};

    var winner = localStorage.getItem('tic-toe winner')
    this.userwinner_id = JSON.parse(winner || '[]') || [];

    this.tic_winner = this.userwinner_id.filter(x => x.id == current_loginuser.username)
    this.authService.getTicgamehistory(current_loginuser.id).subscribe(x => {

      this.tic_winner = x.data;
    })
  }
}
