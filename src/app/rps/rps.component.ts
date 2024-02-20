import { Component } from '@angular/core';

@Component({
  selector: 'app-rps',
  templateUrl: './rps.component.html',
  styleUrls: ['./rps.component.css']
})
export class RPSComponent {
  gameStarted: boolean = false;
  totalRounds: any;
  currentRound: number = 0;
  playerScore: number = 0;
  computerScore: number = 0;
  result: any = null;
  resultMessage: string|undefined;
  computerMove: string|undefined;
  playerMove: any;
  

  startGame() {
    this.currentRound = 1;
    this.playerScore = 0;
    this.computerScore = 0;
    this.result = null;
    this.resultMessage = '';
    this.computerMove = '';
    this.gameStarted = true;
  }

  play(playerMove: string) {
    const moves = ['rock', 'paper', 'scissors'];
    const computerMove = moves[Math.floor(Math.random() * moves.length)];
    this.computerMove = computerMove;
    this.playerMove=playerMove;

    if (playerMove === computerMove) {
      this.result = 'draw';
      this.resultMessage = 'It\'s a draw!';
    } else if (
      (playerMove === 'rock' && computerMove === 'scissors') ||
      (playerMove === 'paper' && computerMove === 'rock') ||
      (playerMove === 'scissors' && computerMove === 'paper')
    ) {
      this.result = 'win';
      this.resultMessage = 'You win!';
      this.playerScore++;
    } else {
      this.result = 'lose';
      this.resultMessage = 'You lose!';
      this.computerScore++;
    }

    this.currentRound++;
    if (this.currentRound > this.totalRounds) {
      this.gameStarted = false;
    }
  }

  resetGame() {
    this.gameStarted = false;
    this.totalRounds = null;
  }
}

