import { Component,OnInit } from '@angular/core';

@Component({
  selector: 'app-sudoku',
  templateUrl: './sudoku.component.html',
  styleUrls: ['./sudoku.component.css']
})
export class SudokuComponent {

 
  sudokuGrid: number[][] = [
    [5, 3, 0, 0, 7, 0, 0, 0, 0],
    [6, 0, 0, 1, 9, 5, 0, 0, 0],
    [0, 9, 8, 0, 0, 0, 0, 6, 0],
    [8, 0, 0, 0, 6, 0, 0, 0, 3],
    [4, 0, 0, 8, 0, 3, 0, 0, 1],
    [7, 0, 0, 0, 2, 0, 0, 0, 6],
    [0, 6, 0, 0, 0, 0, 2, 8, 0],
    [0, 0, 0, 4, 1, 9, 0, 0, 5],
    [0, 0, 0, 0, 8, 0, 0, 7, 9]
  ];

  ngOnInit() {
  }

  onCellChange(event: any, row: number, col: number) {
    const value = event.target.value;
    this.sudokuGrid[row][col] = value ? parseInt(value) : 0;
  }

  solveSudoku() {
    if (this.solve()) {
      console.log("Sudoku puzzle solved!");
    } else {
      console.log("No solution exists for this Sudoku puzzle!");
    }
    if (this.solve()) {
      console.log("Sudoku puzzle solved! You win!");
    } else {
      console.log("No solution exists for this Sudoku puzzle. You lose!");
    }
  }
  
  solve(): boolean {
    let emptyCell = this.findEmptyCell();
    if (!emptyCell) {
      return true; // Puzzle solved
    }
  
    let [row, col] = emptyCell;
    for (let num = 1; num <= 9; num++) {
      if (this.isValidMove(row, col, num)) {
        this.sudokuGrid[row][col] = num;
        if (this.solve()) {
          return true;
        }
        this.sudokuGrid[row][col] = 0; // Backtrack
      }
    }
    return false; // No solution found for this branch, backtrack
  }
  
  findEmptyCell(): [number, number] | null {
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        if (this.sudokuGrid[row][col] === 0) {
          return [row, col];
        }
      }
    }
    return null; // All cells filled, puzzle solved
  }
  
  isValidMove(row: number, col: number, num: number): boolean {
    return (
      this.isRowValid(row, num) &&
      this.isColValid(col, num) &&
      this.isBoxValid(row - row % 3, col - col % 3, num)
    );
  }
  
  isRowValid(row: number, num: number): boolean {
    for (let col = 0; col < 9; col++) {
      if (this.sudokuGrid[row][col] === num) {
        return false;
      }
    }
    return true;
  }
  
  isColValid(col: number, num: number): boolean {
    for (let row = 0; row < 9; row++) {
      if (this.sudokuGrid[row][col] === num) {
        return false;
      }
    }
    return true;
  }
  
  isBoxValid(startRow: number, startCol: number, num: number): boolean {
    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 3; col++) {
        if (this.sudokuGrid[row + startRow][col + startCol] === num) {
          return false;
        }
      }
    }
    return true;
  }

  resetGrid() {
    this.sudokuGrid = [
      [5, 3, 0, 0, 7, 0, 0, 0, 0],
      [6, 0, 0, 1, 9, 5, 0, 0, 0],
      [0, 9, 8, 0, 0, 0, 0, 6, 0],
      [8, 0, 0, 0, 6, 0, 0, 0, 3],
      [4, 0, 0, 8, 0, 3, 0, 0, 1],
      [7, 0, 0, 0, 2, 0, 0, 0, 6],
      [0, 6, 0, 0, 0, 0, 2, 8, 0],
      [0, 0, 0, 4, 1, 9, 0, 0, 5],
      [0, 0, 0, 0, 8, 0, 0, 7, 9]
    ];
  }
}


