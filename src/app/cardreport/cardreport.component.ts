import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cardreport',
  templateUrl: './cardreport.component.html',
  styleUrls: ['./cardreport.component.css']
})
export class CardreportComponent {
  card_winner?: any[] = []
  userwinner_id: any[] = [];
  message?: string;

  ngOnInit() {
    this.get_history()
  }

  constructor(private authService: AuthService, private toastr: ToastrService) {
    // var login = localStorage.getItem('loginuser')
    // var current_loginuser = JSON.parse(login || '[]') || [];

    // var winner = localStorage.getItem('card winner')
    // this.userwinner_id = JSON.parse(winner || '[]') || [];
  }
  get_history() {

    var login = localStorage.getItem('loginuser')
    var current_loginuser = JSON.parse(login || '[]') || [];

    var winner = localStorage.getItem('cardwinner')
    this.userwinner_id = JSON.parse(winner || '[]') || [];

    // this.card_winner = this.userwinner_id.filter(x => x.id == current_loginuser.username)

    this.card_winner = this.userwinner_id.filter(x => x.id == current_loginuser.username)
    this.authService.getcardgamehistory(current_loginuser.id).subscribe(x => {

      this.card_winner = x.data;
    })
  }
}
