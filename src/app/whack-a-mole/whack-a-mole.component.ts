import { Component,OnInit } from '@angular/core';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-whack-a-mole',
  templateUrl: './whack-a-mole.component.html',
  styleUrls: ['./whack-a-mole.component.css']
})
export class WhackAMoleComponent {
  moles:any ='🐶'; // Represents the status of each mole (whacked or not)
  score: number=5;
  timeLeft:number=60;
  timer: any;
  gameOver: any;
  targetScore:number=7;


  constructor() {
  this.restart()
   }

  ngOnInit(): void {
    this.initGame();
  }

  initGame(): void {
    this.moles = Array(9).fill(false); // Initialize 9 mole holes with no moles
    this.score = 0; // Initialize score
    this.timeLeft = 30; // Set game time to 10 seconds (for demonstration)
    this.gameOver = false;
    this.startTimer(); // Start the timer
    this.generateMole(); // Start generating moles
  }

  startTimer(): void {
    this.timer = setInterval(() => {
      this.timeLeft--;
      if (this.timeLeft === 0) {
        this.endGame();
      }
    }, 1000);
  }

  restart(): void {
    clearInterval(this.timer); // Stop the timer
    this.initGame(); // Reset the game
  }

  generateMole(): void {
    setInterval(() => {
      if (!this.gameOver) {
        const randomIndex = Math.floor(Math.random() * this.moles.length);
        this.moles[randomIndex] = true; // Set mole at random hole
        setTimeout(() => {
          if (this.moles[randomIndex]) {
            this.moles[randomIndex] = false; // Disappear mole after some time
          }
        }, Math.random() * 3000 + 1000); // Random time between 1 to 4 seconds
      }
    }, 2000); // Generate new mole every 2 seconds
  }

  whack(index: number): void {
    if (!this.gameOver && this.moles[index]) { // If the game is not over and there's a mole at this hole
      this.moles[index] = false; // Whack the mole
      this.score++; // Increase score
      if (this.score >= this.targetScore) { // Check if player has reached target score
        this.endGame(); 
      }
    }
  }
  endGame(): void {
    clearInterval(this.timer); // Stop the timer
    this.gameOver = true;
    
    if (this.timeLeft === 0) {
      Swal.fire("Time's up! Your final score is: " + this.score);
    } else if (this.score < this.targetScore) {
      Swal.fire("Game Over! You did not reach the target score. Your final score is: " + this.score);
    } else {
      Swal.fire("Congratulations! You've won the game with a score of: " + this.score);
    }
    
    // Optionally, you can automatically restart the game here
  }
}

