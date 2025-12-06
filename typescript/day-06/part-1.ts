import { loadInput, mult, sum, toInt, transpose } from "../utils";

const toOperation = (op: unknown) => {
  if (op === "+") return sum;
  if (op === "*") return mult;
  throw new Error(`Unsupported operation "${op}"`);
};

const toProblems = (worksheet: string) => {
  const rows = worksheet
    .split("\n")
    .map((row) => Array.from(row.match(/\S+/g) ?? []));

  return transpose(rows);
};

const calculate = (problem: string[]) => {
  const nums = problem.slice(0, -1).map(toInt);
  const operation = toOperation(problem.at(-1));
  return operation(nums);
};

const input = loadInput();
const problems = toProblems(input);
const results = problems.map(calculate);

console.log(sum(results));
