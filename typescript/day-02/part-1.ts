import { loadInput, toInt, sum } from "../utils";

const toIds = (range: string): string[] => {
  const [start, end] = range.split("-").map(toInt);
  return Array.from({ length: end - start + 1 }, (_, i) => `${start + i}`);
};

const isInvalid = (id: string): boolean => {
  if (id.length % 2 !== 0) return false;

  const mid = Math.floor(id.length / 2);
  const a = id.slice(0, mid);
  const b = id.slice(mid);

  return a === b;
};

const input = loadInput();
const ranges = input.split(",");
const ids = ranges.flatMap(toIds);
const invalids = ids.filter(isInvalid);

console.log(sum(invalids.map(toInt)));
