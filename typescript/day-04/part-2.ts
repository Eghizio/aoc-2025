import { loadInput, toMatrix, type Matrix } from "../utils";

type Position = { x: number; y: number };

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

const isPaper = (x: string) => x === "@";

const countNeighbours = (matrix: Matrix<string>, { x, y }: Position) => {
  const { center, ...neighbours } = around(matrix, { x, y });
  return Array.from(Object.values(neighbours)).filter(isPaper).length;
};

const isPaperAccessible = (
  matrix: Matrix<string>,
  { x, y }: Position,
  maxNeighbours = 3
) => {
  if (!isPaper(matrix[y][x])) return false;

  const neighbours = countNeighbours(matrix, { x, y });
  return neighbours <= maxNeighbours;
};

const getAccessiblePapers = (matrix: Matrix<string>): Position[] => {
  const accessiblePapers: Position[] = [];

  for (let y = 0; y < matrix.length; y++) {
    for (let x = 0; x < matrix[y].length; x++) {
      const position = { x, y };

      if (isPaperAccessible(matrix, position)) {
        accessiblePapers.push(position);
      }
    }
  }

  return accessiblePapers;
};

const removeMarkedPapers = (
  matrix: Matrix<string>,
  accessiblePapers: Position[]
) => {
  accessiblePapers.forEach(({ x, y }) => {
    matrix[y][x] = "x";
  });
  return matrix;
};

const countRemovedPapers = (matrix: Matrix<string>) => {
  let removed = 0;

  for (let y = 0; y < matrix.length; y++) {
    for (let x = 0; x < matrix[y].length; x++) {
      if (matrix[y][x] === "x") {
        removed++;
      }
    }
  }

  return removed;
};

const removeAccessiblePapers = (matrix: Matrix<string>) => {
  let papers = getAccessiblePapers(matrix);

  while (papers.length !== 0) {
    matrix = removeMarkedPapers(matrix, papers);
    papers = getAccessiblePapers(matrix);
  }

  return matrix;
};

const input = loadInput();
const matrix = toMatrix(input);

console.log(countRemovedPapers(removeAccessiblePapers(matrix)));
