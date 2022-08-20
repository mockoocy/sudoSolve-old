import randomSample from "./randomSample";

export default function generateSudoku(sudokuSize: number, filledCelsAmount: number){
  //generates valid sudoku board of sudokuSize x sudokuSize dimensions
  const base = Math.sqrt(sudokuSize); // length of a small grid's side
  // size is the direction of one of sudoku board's side, the classic one would be size = 9;
  const basePattern = (row: number, col: number) => (base * (row%base) + Math.floor(row/base) +col) % sudokuSize;


  function range(end: number, start=0){
    return Array.from(Array(end).keys()).map(i => i + start)
  }

  const shuffle = (arr: any[]) => randomSample(arr,arr.length)

  const baseRange = range(base);
  const rows: number[] = [];
  shuffle(baseRange).forEach(row => {
    shuffle(baseRange).forEach(num => {
      rows.push(num * base + row)
    })
  })
  
  const cols: number[] = [];
  
  shuffle(baseRange).forEach(col => {
    shuffle(baseRange).forEach(num => {
      cols.push(num * base + col)
    })
  })
  
  const nums: number[] = randomSample(range(sudokuSize, 1),sudokuSize);

  const board = rows.map(row=> {
    return cols.map(col =>{
      return nums[basePattern(row,col)]
    })
  })


  return board

}