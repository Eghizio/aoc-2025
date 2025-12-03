import { loadInput, toInt, sum } from "../utils";

const toBatteries = (line: string): number[] => line.split("").map(toInt);

const toJoltage = (digits: number[]): number => toInt(digits.join(""));

const CAPACITY = 12;
const getWindow = (bank: number[], lastIndex: number, collected: number) => {
  const offset = CAPACITY - 1 - collected;
  return offset <= 0 ? bank.slice(lastIndex) : bank.slice(lastIndex, -offset);
};

const getJoltageDigits = (bank: number[]) => {
  const collected: number[] = [];

  let lastIndex = 0;

  for (let i = 0; i < CAPACITY; i++) {
    const wnd = getWindow(bank, lastIndex, collected.length);
    const max = Math.max(...wnd);
    collected.push(max);

    const idx = bank.slice(lastIndex).findIndex((v) => v === max);
    lastIndex = lastIndex + idx + 1;
  }

  return collected;
};

const input = loadInput();
const batteries = input.split("\n").map(toBatteries);
const digits = batteries.map(getJoltageDigits);
const total = sum(digits.map(toJoltage));

console.log(total);
