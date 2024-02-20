import { Component } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
@Component({
  selector: 'app-guessthenumber',
  templateUrl: './guessthenumber.component.html',
  styleUrls: ['./guessthenumber.component.css'],
  animations: [
    trigger('feedbackAnimation', [
      state('correct', style({
        backgroundColor: '#a8e6cf'
      })),
      state('incorrect', style({
        backgroundColor: '#ffb6b9'
      })),
      transition('* => *', [
        animate('0.5s')
      ])
    ])
  ]
})

export class GuessthenumberComponent {
  min = 1;
  max = 10;
  randomNumber: any;
  guess: any;
  message: any;
  attempts: number = 0;
  maxAttempts: number = 3;
  score: number = 0;
  gameOver: any;
  feedbackState: any;
  showGame: boolean = false; 

  constructor() {
    this.resetGame();
  }

  resetGame() {
    this.randomNumber = this.generateRandomNumber();
    this.guess = null;
    this.message = '';
    this.attempts = 0;
    this.gameOver = false;
  }

  generateRandomNumber(): number {
    return Math.floor(Math.random() * (this.max - this.min + 1)) + this.min;
  }

  checkGuess() {
    if (this.guess === this.randomNumber) {
      this.message = 'Congratulations! You guessed the correct number.';
      this.gameOver = true;
      this.score += 10; // Increase score for correct guess
      this.feedbackState = 'correct';
    } else {
      this.attempts++;
      if (this.attempts >= this.maxAttempts) {
        this.message = `Sorry, you have used all your attempts. The number was ${this.randomNumber}.`;
        this.gameOver = true;
      } else {
        this.message = this.guess > this.randomNumber ? 'Too high, try again.' : 'Too low, try again.';
      }
      this.feedbackState = 'incorrect';
    }
  }
  /*checkGuess() {
    if (this.guess === this.randomNumber) {
      this.message = 'Congratulations! You guessed the correct number.';
      this.gameOver = true;
      this.score += 10; // Increase score for correct guess
    } else {
      this.attempts++;
      if (this.attempts >= this.maxAttempts) {
        this.message = `Sorry, you have used all your attempts. The number was ${this.randomNumber}.`;
        this.gameOver = true;
      } else {
        this.message = this.guess > this.randomNumber ? 'Too high, try again.' : 'Too low, try again.';
      }
    }
  }*/
  
}

