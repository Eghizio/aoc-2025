import { loadInput, toInt, sum } from "../utils";

const toIds = (range: string): string[] => {
  const [start, end] = range.split("-").map(toInt);
  return Array.from({ length: end - start + 1 }, (_, i) => `${start + i}`);
};

const hasSubsequences = (id: string): boolean => {
  const length = id.length;

  const to = Math.floor(length / 2);
  const indexes = Array.from({ length: to }, (_, i) => i + 1);

  const sequences = indexes.map((i) => id.slice(0, i));

  return sequences.some((seq) => {
    const partial = seq.padEnd(length, seq);
    return partial === id && id.endsWith(seq);
  });
};

const input = loadInput();
const ranges = input.split(",");
const ids = ranges.flatMap(toIds);
const invalids = ids.filter(hasSubsequences);

console.log(sum(invalids.map(toInt)));
