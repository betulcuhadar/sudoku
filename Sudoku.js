import { Util } from "./Util.js";
import { SudokuUtil } from "./SudokuUtil.js";

export class Sudoku {
  constructor(sudoku) {
    if (!sudoku) {
      this.sudoku = createPuzzle();
    } else {
      this.sudoku = sudoku;
    }
    this.solvedSudoku = [];
    this.isValidSudoku = false;
    this.isSolved = false;
  }

  get puzzle() {
    return this.sudoku;
  }

  get solvedPuzzle() {
    return this.solvedSudoku;
  }

  validate() {
    return isValidSolution(this.sudoku);
  }

  isSolvable() {
    this.isValidSudoku = isValidPuzzle(this.sudoku);
    if (this.isValidSudoku) {
      Util.copyGrid(this.sudoku, this.solvedSudoku);
      return solve(this.solvedSudoku);
    } else {
      return false;
    }
  }
}

function isValidPuzzle(grid) {
  if (SudokuUtil.isValidPuzzle(grid)) {
    return true;
  }
  return false;
}

function isValidSolution(grid) {
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      if (grid[i][j] === 0) {
        return false;
      }
    }
  }
  return SudokuUtil.isValidPuzzle(grid);
}

function solve(grid) {
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      if (grid[row][col] === 0) {
        for (let guess = 1; guess < 10; guess++) {
          if (SudokuUtil.isValidPlace(grid, row, col, guess)) {
            grid[row][col] = guess;
            if (solve(grid)) {
              return true;
            }
            grid[row][col] = 0;
          }
        }
        return false;
      }
    }
  }
  return true;
}

function createPuzzle() {
  let puzzle = getRandomSudoku();
  let solution = solve(puzzle);
  if (solution) {
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        if (Math.random() > 0.3) puzzle[i][j] = 0;
      }
    }
  }
  return puzzle;
}

function getRandomSudoku() {
  let randomSudoku = [];
  for (let i = 0; i < 9; i++) {
    randomSudoku[i] = Array(9).fill(0);
  }
  for (let i = 0; i < 8; i++) {
    let number = Math.floor(Math.random() * 8) + 1;
    while (!SudokuUtil.isValidPlace(randomSudoku, 0, i, number)) {
      number = Math.floor(Math.random() * 8) + 1;
    }
    if (SudokuUtil.isValidPlace(randomSudoku, 0, i, number)) {
      randomSudoku[0][i] = number;
    }
  }
  return randomSudoku;
}
