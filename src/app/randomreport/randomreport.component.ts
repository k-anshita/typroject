import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-randomreport',
  templateUrl: './randomreport.component.html',
  styleUrls: ['./randomreport.component.css']
})
export class RandomreportComponent {
  chess_winner: any[] = []
  userwinner_id: any[] = [];
  message?:string;

  ngOnInit() {
    this.get_history()
  }

  constructor(private authService: AuthService, private toastr: ToastrService) { }
  get_history() {

    var login = localStorage.getItem('loginuser')
    var current_loginuser = JSON.parse(login || '[]') || [];

    var winner = localStorage.getItem('randomwinner')
    this.userwinner_id = JSON.parse(winner || '[]') || [];

    // this.chess_winner = this.userwinner_id.filter(x => x.id == current_loginuser.username)

    this.authService.getnumbergamehistory(current_loginuser.id).subscribe(x => {

      this.chess_winner = x.data;
    })
  }
}
