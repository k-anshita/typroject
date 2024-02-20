import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-tic-toe',
  templateUrl: './tic-toe.component.html',
  styleUrls: ['./tic-toe.component.css']
})
export class TicToeComponent {
  getvalue = ['', '', '', '', '', '', '', '', ''];
  winnerPositions = [[0, 1, 2], [0, 3, 6], [0, 4, 8], [1, 4, 7], [2, 5, 8], [3, 4, 5], [6, 7, 8], [2, 4, 6]];
  winnerPosition: number[] | undefined = [];
  result = ""
  turn = ''

  constructor(private authService: AuthService) {
  }


  onclicks(index: any) {
    if (this.getvalue[index]) {
      return;
    }
    const filledData = this.getvalue.filter(x => x);
    if (filledData.length % 2 == 0) {
      this.getvalue[index] = '0'
      this.playerturn()
    } else {
      this.getvalue[index] = 'X'
      this.playerturn()
    }
    if (this.result) {
      this.getvalue[index] = '';
    }
    this.getresult()


  }

  reset() {
    this.getvalue = ['', '', '', '', '', '', '', '', ''];
    this.result = '';
    this.winnerPosition = [];

  }
  getresult() {
    this.winnerPosition = this.winnerPositions.find((x, i) =>
      this.getvalue[x[0]]
      && this.getvalue[x[1]]
      && this.getvalue[x[2]]
      && this.getvalue[x[0]] == this.getvalue[x[1]]
      && this.getvalue[x[1]] == this.getvalue[x[2]]);
    if (this.winnerPosition) {
      this.result = `Player ${this.getvalue[this.winnerPosition[0]]} is win`;
      this.turn = '';
    }
    else if (this.getvalue[0] != '' && this.getvalue[1] != '' && this.getvalue[2] != '' &&
      this.getvalue[3] != '' && this.getvalue[4] != '' && this.getvalue[5] != '' &&
      this.getvalue[6] != '' && this.getvalue[7] != '' && this.getvalue[8] != '') {
      this.result = 'Match Is Draw!!'
    }
    var ticwinner = localStorage.getItem('tic-toe winner')
    const arr = JSON.parse(ticwinner || '[]') || [];
    var current_user = localStorage.getItem('loginuser')
    const loggedInUser = JSON.parse(current_user || '[]') || [];

    const obj = {
      message: this.result,
      userId: loggedInUser.id,

      // id:loggedInUser.username
    }
    arr.push(obj)
    if (this.result != '') {
      localStorage.setItem('tic-toe winner', JSON.stringify(arr) || '')
      this.authService.ticgamehistory(obj).subscribe(x => {
        console.log(obj)
      });
    }
  }
  playerturn() {
    const filledData = this.getvalue.filter(x => x);
    if (filledData.length % 2 == 0) {
      this.turn = 'Now Player 0 Turn'
    } else {
      this.turn = 'Now Player X Turn'
    }

  }

}
// if (this.getvalue[0] == '0' && this.getvalue[3] == '0' && this.getvalue[6] == '0') {
    //   this.result = "player 0 is win"
    // } else if (this.getvalue[1] == '0' && this.getvalue[4] == '0' && this.getvalue[7] == '0') {
    //   this.result = "player 0 is win"

    // } else if (this.getvalue[2] == '0' && this.getvalue[5] == '0' && this.getvalue[8] == '0') {
    //   this.result = "player 0 is win"

    // } else if (this.getvalue[0] == '0' && this.getvalue[1] == '0' && this.getvalue[2] == '0') {
    //   this.result = "player 0 is win"

    // } else if (this.getvalue[3] == '0' && this.getvalue[4] == '0' && this.getvalue[5] == '0') {
    //   this.result = "player 0 is win"

    // } else if (this.getvalue[6] == '0' && this.getvalue[7] == '0' && this.getvalue[8] == '0') {
    //   this.result = "player 0 is win"

    // } else if (this.getvalue[0] == '0' && this.getvalue[4] == '0' && this.getvalue[8] == '0') {
    //   this.result = "player 0 is win"

    // } else if (this.getvalue[2] == '0' && this.getvalue[4] == '0' && this.getvalue[6] == '0') {
    //   this.result = "player 0 is win"

    // } else if (this.getvalue[0] == 'X' && this.getvalue[3] == 'X' && this.getvalue[6] == 'X') {
    //   this.result = "player X is win"

    // } else if (this.getvalue[1] == 'X' && this.getvalue[4] == 'X' && this.getvalue[7] == 'X') {
    //   this.result = "player X is win"

    // } else if (this.getvalue[2] == 'X' && this.getvalue[5] == 'X' && this.getvalue[8] == 'X') {
    //   this.result = "player X is win"

    // } else if (this.getvalue[0] == 'X' && this.getvalue[1] == 'X' && this.getvalue[2] == 'X') {
    //   this.result = "player X is win"

    // } else if (this.getvalue[3] == 'X' && this.getvalue[4] == 'X' && this.getvalue[5] == 'X') {
    //   this.result = "player X is win"

    // } else if (this.getvalue[6] == 'X' && this.getvalue[7] == 'X' && this.getvalue[8] == 'X') {
    //   this.result = "player X is win"

    // } else if (this.getvalue[0] == 'X' && this.getvalue[4] == 'X' && this.getvalue[8] == 'X') {
    //   this.result = "player X is win"

    // } else if (this.getvalue[2] == 'X' && this.getvalue[4] == 'X' && this.getvalue[6] == 'X') {
    //   this.result = "player X is win"

    // }
    // if(this.getvalue[0]!=''&&this.getvalue[1]!=''&&this.getvalue[2]!=''&&this.getvalue[3]!=''&&this.getvalue[4]!=''&&this.getvalue[5]!=''&&this.getvalue[6]!=''&&this.getvalue[7]!=''&&this.getvalue[8]!=''){
    //   this.result="Match is draw"
    // }

