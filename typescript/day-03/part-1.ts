import { loadInput, toInt, sum } from "../utils";

const toBatteries = (line: string): number[] => line.split("").map(toInt);

const toJoltage = (digits: number[]): number => toInt(digits.join(""));

const getJoltageDigits = (bank: number[]) => {
  const sorted = bank.slice(0, -1).toSorted((a, b) => b - a);

  const index = sorted.reduce((acc, joltage) => {
    const i = bank.findIndex((v) => v === joltage);

    const max = bank[acc];
    return max >= joltage ? acc : i;
  }, 0);

  const first = bank[index];
  const second = Math.max(...bank.slice(index + 1));

  return [first, second];
};

const input = loadInput();
const batteries = input.split("\n").map(toBatteries);
const digits = batteries.map(getJoltageDigits);
const total = sum(digits.map(toJoltage));

console.log(total);
