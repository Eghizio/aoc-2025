import { loadInput, toInt } from "../utils";

const parseRotation = (text: string): number => {
  const value = toInt(text.slice(1));
  return text.startsWith("L") ? -value : value;
};

const MAX = 99 + 1;
const rotate = (position: number, rotation: number) =>
  (MAX + position + rotation) % MAX;

const countZeros = (rotations: number[]) => {
  const [position, zeros] = rotations.reduce(
    ([position, zeros], rotation) => {
      const next = rotate(position, rotation);
      return [next, zeros + (next === 0 ? 1 : 0)];
    },
    [50, 0]
  );

  return zeros;
};

const input = loadInput();
const lines = input.split("\n");
const rotations = lines.map(parseRotation);

console.log(countZeros(rotations));
