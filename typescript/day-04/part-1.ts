import { loadInput, toMatrix, type Matrix } from "../utils";

type Position = { x: number; y: number };

const isPaper = (x: string) => x === "@";

const around = (matrix: Matrix<string>, { x, y }: Position) => ({
  center: matrix?.[y]?.[x],

  top: matrix?.[y - 1]?.[x],
  bottom: matrix?.[y + 1]?.[x],
  left: matrix?.[y]?.[x - 1],
  right: matrix?.[y]?.[x + 1],

  topLeft: matrix?.[y - 1]?.[x - 1],
  topRight: matrix?.[y - 1]?.[x + 1],
  bottomLeft: matrix?.[y + 1]?.[x - 1],
  bottomRight: matrix?.[y + 1]?.[x + 1],
});

const countNeighbours = (matrix: Matrix<string>, { x, y }: Position) => {
  const { center, ...neighbours } = around(matrix, { x, y });
  return Array.from(Object.values(neighbours)).filter(isPaper).length;
};

const countAccessiblePapers = (matrix: Matrix<string>) => {
  let accessiblePapers = 0;

  for (let y = 0; y < matrix.length; y++) {
    for (let x = 0; x < matrix[y].length; x++) {
      if (isPaper(matrix[y][x])) {
        const neighbours = countNeighbours(matrix, { x, y });
        if (neighbours < 4) {
          accessiblePapers++;
        }
      }
    }
  }

  return accessiblePapers;
};

const input = loadInput();
const matrix = toMatrix(input);

console.log(countAccessiblePapers(matrix));
