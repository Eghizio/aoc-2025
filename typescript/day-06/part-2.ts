import { loadInput, toMatrix, transpose, toInt, sum, mult } from "../utils";
import type { Matrix } from "../utils";

const toOperation = (op: unknown) => {
  if (op === "+") return sum;
  if (op === "*") return mult;
  throw new Error(`Unsupported operation "${op}"`);
};

const chunk = (arr: number[]): Matrix<number> =>
  arr.reduce<number[][]>((acc, num) => {
    if (isNaN(num)) return [...acc, []];

    const last = acc.at(-1) ?? [];
    return [...acc.slice(0, -1), [...last, num]];
  }, []);

const getOperations = (matrix: Matrix<string>) =>
  (matrix.at(-1) ?? []).filter((x) => x.trim()).map(toOperation);

const getNumbers = (matrix: Matrix<string>): Matrix<number> =>
  chunk(transpose(matrix.slice(0, -1)).map((digits) => toInt(digits.join(""))));

const calculateRightToLeft = (matrix: Matrix<string>) => {
  const operations = getOperations(matrix);
  const numbers = getNumbers(matrix);

  return numbers.map((nums, i) => operations[i](nums));
};

const input = loadInput();
const matrix = toMatrix(input);
const results = calculateRightToLeft(matrix);

console.log(sum(results));
