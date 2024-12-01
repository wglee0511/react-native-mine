import React, { useMemo } from "react";

import { View } from "react-native";

import { map } from "lodash";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useRecoilState } from "recoil";

import MineCell from "./MineCell";

import Divider from "@/components/Divider";
import { settingState } from "@/store/setting/atom";
import globalStyles from "@/theme/globalStyles";

const MainContents = () => {
  const [setting] = useRecoilState(settingState);

  const renderCell = useMemo(
    () =>
      map(setting.board, (row, rI) => (
        <View
          key={`${row[rI]}-${rI}`}
          style={[globalStyles.rowAlignCenterContainer, globalStyles.justifyCenter]}
        >
          {map(row, (col, cI) => (
            <MineCell key={rI * row.length + cI} type={col} rowIndex={rI} colIndex={cI} />
          ))}
        </View>
      )),
    [setting.board]
  );

  return (
    <View
      style={[
        globalStyles.defaultFlexContainer,
        { width: "100%", paddingVertical: 10, paddingHorizontal: 20 }
      ]}
    >
      <KeyboardAwareScrollView contentContainerStyle={[{ flexGrow: 1 }]}>
        <View style={[{ width: "100%" }]}>{renderCell}</View>
        <Divider vertical={50} />
      </KeyboardAwareScrollView>
    </View>
  );
};

export default MainContents;
