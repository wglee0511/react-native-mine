import { forEach, map } from "lodash";

import { MineCell } from "@/types/game";
import { LevelSize } from "@/types/size";

import { CELL_TYPE, SIZE_VALUE } from "@/constants/constants";

export const generateBoard = (currentLevel: LevelSize): MineCell => {
  const [width, height] = SIZE_VALUE[currentLevel];
  const boardData: number[][] = [];

  for (let i = 0; i < height; i += 1) {
    const rowData = [];
    for (let j = 0; j < width; j += 1) {
      rowData.push(CELL_TYPE.NORMAL);
    }
    boardData.push(rowData);
  }

  return boardData;
};

export const getCellText = (code: number) => {
  switch (code) {
    case CELL_TYPE.NORMAL:
      return "";
    case CELL_TYPE.MINE:
      return "";
    case CELL_TYPE.CLICKED_MINE:
      return "🧨";
    case CELL_TYPE.FLAG_MINE:
    case CELL_TYPE.FLAG:
      return "⛳️";
    case CELL_TYPE.QUESTION_MINE:
    case CELL_TYPE.QUESTION:
      return "❓";
    default:
      return code || "";
  }
};

export const countFineMine = ({
  row,
  col,
  boardData
}: {
  row: number;
  col: number;
  boardData: number[][];
}) => {
  let neighborCells: number[] = [];
  let mineCount = 0;

  neighborCells = boardData[row - 1]
    ? neighborCells.concat(
        boardData[row - 1][col - 1],
        boardData[row - 1][col],
        boardData[row - 1][col + 1]
      )
    : neighborCells;

  neighborCells = neighborCells.concat(boardData[row][col - 1], boardData[row][col + 1]);

  neighborCells = boardData[row + 1]
    ? neighborCells.concat(
        boardData[row + 1][col - 1],
        boardData[row + 1][col],
        boardData[row + 1][col + 1]
      )
    : neighborCells;

  mineCount = neighborCells.filter((v) =>
    [CELL_TYPE.MINE, CELL_TYPE.CLICKED_MINE, CELL_TYPE.FLAG_MINE, CELL_TYPE.QUESTION_MINE].includes(
      v
    )
  ).length;

  return mineCount;
};

export const checkAroundMine = ({
  row,
  col,
  boardData,
  checkedMine,
  setOpenCell
}: {
  row: number;
  col: number;
  boardData: number[][];
  checkedMine: string[];
  setOpenCell: (boardValue: MineCell, rowValue: number, colValue: number, count: number) => void;
}) => {
  if (row < 0 || row >= boardData.length || col < 0 || col >= boardData[0].length) {
    return;
  }

  if (
    [
      CELL_TYPE.OPENED,
      CELL_TYPE.FLAG,
      CELL_TYPE.FLAG_MINE,
      CELL_TYPE.QUESTION_MINE,
      CELL_TYPE.QUESTION
    ].includes(boardData[row][col])
  ) {
    return;
  }

  if (checkedMine.includes(`${row}/${col}`)) {
    return;
  }

  checkedMine.push(`${row}/${col}`);

  const count = countFineMine({ row, col, boardData });

  if (count === 0) {
    if (row > -1) {
      const near = [];
      if (row - 1 > -1) {
        near.push([row - 1, col - 1]);
        near.push([row - 1, col]);
        near.push([row - 1, col + 1]);
      }
      near.push([row, col - 1]);
      near.push([row, col + 1]);
      if (row + 1 < boardData.length) {
        near.push([row + 1, col - 1]);
        near.push([row + 1, col]);
        near.push([row + 1, col + 1]);
      }

      forEach(near, (n) => {
        if (boardData[n[0]][n[1]] !== CELL_TYPE.OPENED) {
          checkAroundMine({ row: n[0], col: n[1], boardData, checkedMine, setOpenCell });
        }
      });
    }
  }

  setOpenCell(boardData, row, col, count);
};

export const createMineBoard = ({
  row,
  col,
  mine,
  currentPosition
}: {
  row: number;
  col: number;
  mine: number;
  currentPosition: number;
}): number[] => {
  const minePositionsArr: number[] = [];

  while (minePositionsArr.length < mine) {
    const minePosition = Math.floor(Math.random() * row * col);
    if (!minePositionsArr.includes(minePosition)) {
      if (minePosition !== currentPosition) minePositionsArr.push(minePosition);
    }
  }

  return minePositionsArr;
};

export const plantMineBoard = ({
  col,
  createdMineBoard,
  boardData
}: {
  col: number;
  createdMineBoard: number[];
  boardData: number[][];
}): number[][] => {
  const newBoard = boardData.map((row) => [...row]);
  forEach(createdMineBoard, (position) => {
    const ver = Math.floor(position / col);
    const hor = position % col;

    newBoard[ver][hor] = CELL_TYPE.MINE;
  });

  return newBoard;
};

export const getNewBoard = ({
  board,
  rowValue,
  colValue,
  targetValue
}: {
  board: MineCell;
  rowValue: number;
  colValue: number;
  targetValue: number;
}) =>
  map(board, (row, rI) =>
    map(row, (col, cI) => {
      if (rI === rowValue && cI === colValue) {
        return targetValue;
      }
      return col;
    })
  );

export const getFlagTagText = (number: number) => {
  switch (number) {
    case CELL_TYPE.NORMAL: {
      return CELL_TYPE.FLAG;
    }
    case CELL_TYPE.MINE: {
      return CELL_TYPE.FLAG_MINE;
    }
    case CELL_TYPE.FLAG: {
      return CELL_TYPE.QUESTION;
    }
    case CELL_TYPE.FLAG_MINE: {
      return CELL_TYPE.QUESTION_MINE;
    }
    case CELL_TYPE.QUESTION: {
      return CELL_TYPE.NORMAL;
    }
    case CELL_TYPE.QUESTION_MINE: {
      return CELL_TYPE.MINE;
    }
    default:
      return CELL_TYPE.FLAG;
  }
};
