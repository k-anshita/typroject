import { Component } from '@angular/core';

@Component({
  selector: 'app-word-search',
  templateUrl: './word-search.component.html',
  styleUrls: ['./word-search.component.css']
})
export class WordSearchComponent {
  title='woed-search';
  grid: string[][] = [];
  wordsToFind: string[] = [];
  foundWords: Set<string> = new Set();
  selectedLetters: string[] = [];
  isGameWon: boolean = false;
  timer: number = 30;
  intervalId: any;
  totalTime: number = 0; // Total time in seconds (3 minutes)
  gameOver: boolean = false;

  constructor() { }

  ngOnInit(): void {
    this.initializeGame();
    this.startTimer();
  }

  initializeGame() {
    // Initialize your word search grid and list of words here
    this.initializeGrid();
    this.wordsToFind = [ 'VU'];
  }

  initializeGrid() {
    const numRows = 10;
    const numCols = 10;
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  
    // Initialize the grid with random letters
    for (let i = 0; i < numRows; i++) {
      const row: string[] = [];
      for (let j = 0; j < numCols; j++) {
        row.push(letters.charAt(Math.floor(Math.random() * letters.length)));
      }
      this.grid.push(row);
    }
  
    // Embed words to find in the grid
    for (let word of this.wordsToFind) {
      const direction = Math.random() < 0.5 ? [-1, 0] : [0, -1]; // Choose random direction (up or left)
      const startRow = Math.floor(Math.random() * numRows);
      const startCol = Math.floor(Math.random() * numCols);
  
      let wordFits = true;
      for (let k = 0; k < word.length; k++) {
        const newRow = startRow + direction[0] * k;
        const newCol = startCol + direction[1] * k;
        if (newRow < 0 || newRow >= numRows || newCol < 0 || newCol >= numCols || this.grid[newRow][newCol] !== '') {
          wordFits = false;
          break;
        }
      }
  
      if (wordFits) {
        for (let k = 0; k < word.length; k++) {
          const newRow = startRow + direction[0] * k;
          const newCol = startCol + direction[1] * k;
          this.grid[newRow][newCol] = word.charAt(k);
        }
      } else {
        // If word doesn't fit, try embedding in a different direction
        for (let k = 0; k < word.length; k++) {
          const newRow = Math.floor(Math.random() * numRows);
          const newCol = Math.floor(Math.random() * numCols);
          this.grid[newRow][newCol] = word.charAt(k);
        }
      }
    }
  }
  selectLetter(row: number, col: number) {
    if (!this.gameOver && !this.foundWords.has(this.grid[row][col])) {
      const letter = this.grid[row][col];
      const letterString = `${row},${col}`;

      // Check if letter is already selected
      if (!this.selectedLetters.includes(letterString)) {
        this.selectedLetters.push(letterString);
      } else {
        // If letter is already selected, remove it
        const index = this.selectedLetters.indexOf(letterString);
        this.selectedLetters.splice(index, 1);
      }

      // Check if selected letters form any word
      const selectedWord = this.selectedLetters.map(pos => this.grid[+pos.split(',')[0]][+pos.split(',')[1]]).join('');
      if (this.wordsToFind.includes(selectedWord)) {
        this.foundWords.add(selectedWord);
        if (this.foundWords.size === this.wordsToFind.length) {
          this.stopTimer();
          this.isGameWon = true;
        }
      }
    }
  }

  isSelected(row: number, col: number): boolean {
    return this.selectedLetters.includes(`${row},${col}`);
  }

  isWordFound(word: string): boolean {
    return this.foundWords.has(word);
  }
  isLetterHighlighted(row: number, col: number): boolean {
    if (this.gameOver) {
      for (let word of this.wordsToFind) {
        if (this.isWordFound(word)) {
          if (this.findWordInGrid(word, row, col)) {
            return true;
          }
        }
      }
    }
    return false;
  }
 
  findWordInGrid(word: string, row: number, col: number): boolean {
    const directions = [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]];
    for (let [dx, dy] of directions) {
      let r = row, c = col;
      let found = true;
      for (let letter of word) {
        if (r < 0 || r >= this.grid.length || c < 0 || c >= this.grid[0].length || this.grid[r][c] !== letter) {
          found = false;
          break;
        }
        r += dx;
        c += dy;
      }
      if (found) {
        return true;
      }
    }
    return false;
  }

  startTimer() {
    this.timer=30;
    this.totalTime=0;
    this.intervalId = setInterval(() => {
      this.timer--;

      if (this.timer <= this.totalTime) {
        this.stopTimer();
        if (!this.isGameWon) {
          this.gameOver = true;
          this.stopTimer();// Game is over if the timer runs out and all words are not found
        }
      }
    }, 1000);
  }

  stopTimer() {
    clearInterval(this.intervalId);
  }

  resetGame() {
    this.grid = [];
    this.wordsToFind = [];
    this.foundWords.clear();
    this.selectedLetters = [];
    this.isGameWon = false;
    this.timer = 0;
    this.gameOver = false;
    this.initializeGame();
    this.startTimer();
  }
}

