import express from "express";
import cors from "cors";
import { Sudoku } from "./Sudoku.js";
import { Util } from "./Util.js";
import path from "path";
import { fileURLToPath } from 'url';


const app = express();
const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

app.use(express.json());
app.use(cors());

app.use(express.static(path.join(__dirname, 'client/build')));

app.listen(process.env.PORT || 5000, () => {
  console.log("server running");
});

app.get("/puzzle", (req, res) => {
  let sudoku = new Sudoku();
  let puzzle = sudoku.puzzle;
  res.status(200).send({ game: puzzle });
});

app.post("/solve", (req, res) => {
  let puzzle = [];
  Util.copyGrid(req.body.board, puzzle);
  let sudoku = new Sudoku(puzzle);
  let solution = sudoku.isSolvable();
  let status;
  let solvedSudoku;
  if (solution) {
    solvedSudoku = sudoku.solvedPuzzle;
    status = true;
  } else {
    solvedSudoku = req.body.board;
    status = false;
  }
  res.status(200).send({ solution: solvedSudoku, status: status });
});

app.post("/validate", (req, res) => {
  let puzzle = [];
  Util.copyGrid(req.body.board, puzzle);
  let sudoku = new Sudoku(puzzle);
  let status = sudoku.validate();
  res.status(200).send({ status: status });
});
