export default function getBoardSize(sudokuSize: number, sizeFactor: number){
  const WIDTH_BIAS = 36 
  const MAX_MOBILE_WIDTH = 820
  if (window.innerWidth <= MAX_MOBILE_WIDTH) return {width: "100vw", height: "auto"}
  const boardWidth = `${sizeFactor * (sudokuSize + WIDTH_BIAS)}vw`
  const boardHeight = `${sizeFactor * (sudokuSize + WIDTH_BIAS)}vw`
  return {width: boardWidth, height: boardHeight}
}