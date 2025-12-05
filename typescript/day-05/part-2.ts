import { loadInput, toInt, sum } from "../utils";

type Range = [start: number, end: number];

const toIdRange = (range: string): Range => {
  const [start, end] = range.split("-").map(toInt);
  return [start, end];
};

const toSortedRanges = (input: string): Range[] => {
  const [fresh] = input.split("\n\n").map((s) => s.split("\n"));
  return fresh.map(toIdRange).toSorted((a, b) => a[0] - b[0]);
};

const overlaps = ([a, b]: Range, [c, d]: Range) => a <= d && c <= b;
const merge = ([a, b]: Range, [c, d]: Range): Range => [a, Math.max(b, d)];

const mergeRanges = (ranges: Range[]) => {
  const merged: Range[] = [];
  let acc: Range | null = null;

  for (const index in ranges.slice(0, -1)) {
    const i = toInt(index);

    const current = acc ?? ranges[i];
    const next = ranges[i + 1];

    if (overlaps(current, next)) {
      acc = merge(current, next);
    } else {
      merged.push(current);
      acc = null;
    }
  }

  return acc ? [...merged, acc] : merged;
};

const toRangeSize = ([start, end]: Range) => end - start + 1;

const input = loadInput();
const ranges = toSortedRanges(input);
const merged = mergeRanges(ranges);

console.log(sum(merged.map(toRangeSize)));
