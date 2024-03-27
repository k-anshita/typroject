import { Component } from '@angular/core';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-stackcube',
  templateUrl: './stackcube.component.html',
  styleUrls: ['./stackcube.component.css']
})
export class StackcubeComponent {
  tiles!: any[];
  gridSize: number;
  winningState!: number[];

  constructor() {
    this.gridSize = 3; // Change this for different puzzle sizes
  
  }

  ngOnInit(): void {
    this.initializeGame();
  }

  initializeGame(): void {
    this.winningState = [1,2,3,4,5,6,7,8,0];
    this.tiles = Array.from({ length: this.gridSize * this.gridSize }, (_, i) => i);
    this.shuffle();
  }


  shuffle(): void {
    for (let i = this.tiles.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.tiles[i], this.tiles[j]] = [this.tiles[j], this.tiles[i]];
    }
  }  
  statesAreEqual(state1: number[], state2: number[]): boolean {
    // Check if two states are equal
    return JSON.stringify(state1) === JSON.stringify(state2);
  }
 /* moveTile(index: number): void {
    const emptyIndex = this.tiles.indexOf(0);
    if (this.isAdjacent(index, emptyIndex)) {
      [this.tiles[index], this.tiles[emptyIndex]] = [this.tiles[emptyIndex], this.tiles[index]];
    }
    if (this.statesAreEqual(this.tiles, this.winningState)) {
      // Puzzle solved, perform actions or display message
      console.log('Congratulations! You solved the puzzle!');
    }
  }
  

  isAdjacent(index1: number, index2: number): boolean {
    const row1 = Math.floor(index1 / this.gridSize);
    const col1 = index1 % this.gridSize;
    const row2 = Math.floor(index2 / this.gridSize);
    const col2 = index2 % this.gridSize;
    const rowDiff = Math.abs(row1 - row2);
    const colDiff = Math.abs(col1 - col2);
    return (rowDiff === 1 && colDiff === 0) || (rowDiff === 0 && colDiff === 1);
  }*/

  moveTile(index: number): void {
    // Implement the move logic for a 3x3 puzzle
    const emptyIndex = this.tiles.indexOf(0);
    const rowIndex = Math.floor(index / this.gridSize);
    const colIndex = index % this.gridSize;
    const emptyRowIndex = Math.floor(emptyIndex / this.gridSize);
    const emptyColIndex = emptyIndex % this.gridSize;

    // Check if the clicked tile is adjacent to the empty tile
    if ((Math.abs(rowIndex - emptyRowIndex) === 1 && colIndex === emptyColIndex) ||
        (Math.abs(colIndex - emptyColIndex) === 1 && rowIndex === emptyRowIndex)) {
      // Swap the clicked tile with the empty tile
      [this.tiles[index], this.tiles[emptyIndex]] = [this.tiles[emptyIndex], this.tiles[index]];

      if (this.statesAreEqual(this.tiles, this.winningState)) {
        // Puzzle solved, perform actions or display message
        Swal.fire('Congratulations! You solved the puzzle!');
    
      }
    
    }
    
  }

}



