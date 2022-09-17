import { SmallGrid } from "../types";

export default function getCurrentGrid(
  currentRow: number,
  currentColumn: number,
  smallGridSize: number
): SmallGrid {
  const rowStart = Math.floor(currentRow / smallGridSize) * smallGridSize;
  const rowEnd = rowStart + smallGridSize;
  const colStart = Math.floor(currentColumn / smallGridSize) * smallGridSize;
  const colEnd = colStart + smallGridSize;
  return { rowStart, rowEnd, colStart, colEnd };
}
