import { loadInput, toInt } from "../utils";

type Range = [start: number, end: number];

const toIdRange = (range: string): Range => {
  const [start, end] = range.split("-").map(toInt);
  return [start, end];
};

const getRangesAndIds = (input: string) => {
  const [fresh, available] = input.split("\n\n").map((s) => s.split("\n"));
  const ranges = fresh.map(toIdRange);
  const ids = available.map(toInt);
  return [ranges, ids] as const;
};

const isWithinRange = (id: number, [start, end]: Range): boolean =>
  id >= start && id <= end;

const toFreshIds = (ids: number[], ranges: Range[]): number[] =>
  ids.filter((id) => ranges.some((range) => isWithinRange(id, range)));

const input = loadInput();
const [ranges, ids] = getRangesAndIds(input);
const freshIds = toFreshIds(ids, ranges);

console.log(freshIds.length);
