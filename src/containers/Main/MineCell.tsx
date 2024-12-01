import React, { useCallback, useMemo } from "react";

import { GestureResponderEvent, Pressable } from "react-native";

import { isNil } from "lodash";
import { useRecoilState, useRecoilValue } from "recoil";

import Text from "@/components/Text";
import { CELL_TYPE, GAME_STATUS } from "@/constants/constants";
import { alertMessage } from "@/libs/alert";
import {
  checkAroundMine,
  createMineBoard,
  getCellText,
  getFlagTagText,
  getNewBoard,
  plantMineBoard
} from "@/libs/game";
import { settingState } from "@/store/setting/atom";
import { mineCellSizeState, resultMessageState, rowColCountState } from "@/store/setting/selector";
import { COLORS } from "@/theme/colors";
import globalStyles from "@/theme/globalStyles";

const MineCell = ({
  type,
  rowIndex,
  colIndex
}: {
  type: number;
  rowIndex: number;
  colIndex: number;
}) => {
  const [setting, setSetting] = useRecoilState(settingState);
  const mineCellSize = useRecoilValue(mineCellSizeState);
  const resultMessage = useRecoilValue(resultMessageState);
  const { rowCount, colCount } = useRecoilValue(rowColCountState);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const checked: string[] = [];

  const setOpenCell = useCallback(
    (board: number[][], rowValue: number, colValue: number, countValue?: number) => {
      const targetCell = board[rowValue][colValue];

      if (targetCell === CELL_TYPE.NORMAL || targetCell === CELL_TYPE.QUESTION) {
        if (!isNil(countValue)) {
          setSetting((prevSetting) => ({
            ...prevSetting,
            board: getNewBoard({
              board: prevSetting.board,
              rowValue,
              colValue,
              targetValue: countValue
            }),
            clickedCount: prevSetting.clickedCount + 1,
            status: "PLAYING"
          }));
        }

        if (setting.mineNumber === rowCount * colCount - setting.clickedCount) {
          setSetting((prevSetting) => ({
            ...prevSetting,
            status: GAME_STATUS.WIN
          }));
          alertMessage(resultMessage, "결과");
        }
      }
      if (targetCell === CELL_TYPE.MINE || targetCell === CELL_TYPE.QUESTION_MINE) {
        setSetting((prevSetting) => ({
          ...prevSetting,
          board: getNewBoard({
            board: prevSetting.board,
            rowValue,
            colValue,
            targetValue: CELL_TYPE.CLICKED_MINE
          }),
          status: GAME_STATUS.LOSE
        }));
        alertMessage(resultMessage, "결과");
      }
    },
    [colCount, resultMessage, rowCount, setSetting, setting.clickedCount, setting.mineNumber]
  );

  const onPressCell = useCallback(
    (key: number) => {
      if (setting.status === "READY") {
        const createdMineBoard = createMineBoard({
          row: rowCount,
          col: colCount,
          mine: setting.mineNumber,
          currentPosition: key
        });
        const startingBoard = plantMineBoard({
          col: colCount,
          createdMineBoard,
          boardData: setting.board
        });
        setSetting((prevSetting) => ({
          ...prevSetting,
          board: startingBoard,
          status: GAME_STATUS.PLAYING
        }));
        checkAroundMine({
          row: rowIndex,
          col: colIndex,
          boardData: startingBoard,
          checkedMine: checked,
          setOpenCell
        });
      } else {
        if (type === CELL_TYPE.NORMAL) {
          checkAroundMine({
            row: rowIndex,
            col: colIndex,
            boardData: setting.board,
            checkedMine: checked,
            setOpenCell
          });
        }
        if (type === CELL_TYPE.MINE) {
          setOpenCell(setting.board, rowIndex, colIndex);
        }
      }
    },
    [
      checked,
      colCount,
      colIndex,
      rowCount,
      rowIndex,
      setOpenCell,
      setSetting,
      setting.board,
      setting.mineNumber,
      setting.status,
      type
    ]
  );

  const onLongPressCell = useCallback(
    (e: GestureResponderEvent) => {
      e.preventDefault();

      setSetting((prevSetting) => {
        const targetValue = getFlagTagText(prevSetting.board[rowIndex][colIndex]);
        return {
          ...prevSetting,
          board: getNewBoard({
            board: prevSetting.board,
            rowValue: rowIndex,
            colValue: colIndex,
            targetValue
          })
        };
      });
    },
    [colIndex, rowIndex, setSetting]
  );

  const renderButton = useMemo(() => {
    const isOpen = type >= CELL_TYPE.OPENED;
    const isExplosion = type === CELL_TYPE.CLICKED_MINE;
    const disabled = setting.status === "LOSE" || setting.status === "WIN";
    const explosionColor = isExplosion ? COLORS.red100 : COLORS.grey300;
    const backgroundColor = isOpen
      ? globalStyles.defaultBackgroundColor.backgroundColor
      : explosionColor;

    return (
      <Pressable
        style={({ pressed }) => [
          pressed && { opacity: 0.7 },
          {
            width: mineCellSize,
            height: mineCellSize,
            borderWidth: 1,
            borderColor: COLORS.grey700,
            backgroundColor
          }
        ]}
        disabled={disabled}
        onPress={() => onPressCell(rowIndex * colCount + colIndex)}
        onLongPress={onLongPressCell}
      >
        <Text
          fontSize={mineCellSize * 0.8}
          fontWeight="400"
          color={COLORS.black}
          textAlign="center"
        >
          {getCellText(type)}
        </Text>
      </Pressable>
    );
  }, [
    colCount,
    colIndex,
    mineCellSize,
    onLongPressCell,
    onPressCell,
    rowIndex,
    setting.status,
    type
  ]);

  return renderButton;
};

export default MineCell;
