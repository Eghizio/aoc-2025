import { Matrix, renderMatrix, sleep } from "../../utils";

export class TerminalVisualization {
  static render = async (matrix: Matrix<string>, delay = 64) => {
    console.log("\n".repeat(6));
    renderMatrix(matrix, { ".": "⬛", "@": "⬜", x: "❌" });
    await sleep(delay);
  };
}
