
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, interval, Subscription } from 'rxjs';
import { map, takeWhile } from 'rxjs/operators';
import Swal from 'sweetalert2';
interface Card {
  matched: boolean;
  value: string;
  flipped: boolean;
}
@Component({
  selector: 'app-memory-game',
  templateUrl: './memory-game.component.html',
  styleUrls: ['./memory-game.component.css']
})
export class MemoryGameComponent {

  cards: Card[] = [];
  flippedCards: number[] = [];
  readonly symbols: string[] = ['🐱', '🐶', '🐰', '🐼', '🦊', '🐵', '🐸', '🐷'];
  matchedPairs: number = 0;
  timer: number = 40;
  timer$: Observable<number>|undefined;
  timerSubscription: Subscription|undefined;
  maxTime: number = 0; // Maximum time allowed in seconds

  constructor() {
    this.resetGame();
  }

  ngOnInit() {
    this.timer$ = interval(1000).pipe(
      map(() => --this.timer),
      takeWhile(() => this.timer >= this.maxTime)
    );

    this.timerSubscription = this.timer$.subscribe({
      complete: () => {
        if (!this.isGameWon()) {
          Swal.fire('Time is up! You lose.');
          
        }
      }
    });
  }

  ngOnDestroy() {
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }
  }

  resetGame() {
    this.cards = [];
    this.flippedCards = [];
    this.matchedPairs = 0;
    const shuffledSymbols = this.shuffle([...this.symbols, ...this.symbols]);
    for (const symbol of shuffledSymbols) {
      this.cards.push({ value: symbol, flipped: false, matched: false });
    }
    
  }

  startTimer() {
  }// Timer starts automatically with ngOnInit and timer$ observable
  

  shuffle(array: any[]) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }


  isGameWon(): boolean {
    return this.matchedPairs === this.symbols.length;
  
  }

  formatTime(): string {
    const minutes: string = Math.floor(this.timer / 60).toString().padStart(2, '0');
    const seconds: string = (this.timer % 60).toString().padStart(2, '0');
    return `${minutes}:${seconds}`;
  }  

  flipCard(index: number) {
    if (this.flippedCards.length < 2 && !this.cards[index].flipped && !this.cards[index].matched) {
      this.cards[index].flipped = true;
      this.flippedCards.push(index);

      if (this.flippedCards.length === 2) {
        setTimeout(() => {
          if (this.cards[this.flippedCards[0]].value === this.cards[this.flippedCards[1]].value) {
            this.cards[this.flippedCards[0]].matched = true;
            this.cards[this.flippedCards[1]].matched = true;
            this.matchedPairs += 1;
            if (this.isGameWon()) {
              Swal.fire('Congratulations! You win!');
            }
          } else {
            this.cards[this.flippedCards[0]].flipped = false;
            this.cards[this.flippedCards[1]].flipped = false;
          }
          this.flippedCards = [];
        }, 1000);
      }
    }
  }
}

