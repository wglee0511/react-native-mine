import { forEach } from "lodash";
import { selector } from "recoil";

import { settingState } from "./atom";

import { CELL_TYPE, SIZE_VALUE } from "@/constants/constants";
import { WINDOW_HEIGHT, WINDOW_WIDTH } from "@/constants/env";

export const maxMineNumberState = selector<number>({
  key: "maxMineNumber",
  get: ({ get }) => {
    const setting = get(settingState);
    const number = SIZE_VALUE[setting.level][0] * SIZE_VALUE[setting.level][1];

    return number;
  }
});

export const rowColCountState = selector<{ rowCount: number; colCount: number }>({
  key: "rowColCount",
  get: ({ get }) => {
    const setting = get(settingState);

    return { rowCount: SIZE_VALUE[setting.level][1], colCount: SIZE_VALUE[setting.level][0] };
  }
});

export const mineCellSizeState = selector<number>({
  key: "mineCellWidth",
  get: ({ get }) => {
    const setting = get(settingState);
    const sizeValue = SIZE_VALUE[setting.level];
    const isShortWidth = WINDOW_WIDTH < WINDOW_HEIGHT;
    const mineCount = sizeValue[1] > sizeValue[0] ? sizeValue[0] : sizeValue[1];
    const baseWidth = isShortWidth ? WINDOW_WIDTH : WINDOW_HEIGHT;

    return (baseWidth - 40) / mineCount;
  }
});

export const mineRemainNumberState = selector<number>({
  key: "mineRemainNumber",
  get: ({ get }) => {
    const { board, mineNumber } = get(settingState);
    let flagNumber = 0;

    forEach(board, (row) => {
      forEach(row, (col) => {
        if (col === CELL_TYPE.FLAG || col === CELL_TYPE.FLAG_MINE) {
          flagNumber += 1;
        }
      });
    });

    return mineNumber - flagNumber;
  }
});

export const resultMessageState = selector<string>({
  key: "resultMessage",
  get: ({ get }) => {
    const setting = get(settingState);

    return `${setting.status === "WIN" ? "성공" : "실패"}\n경과시간: ${setting.elapsedTime}`;
  }
});
