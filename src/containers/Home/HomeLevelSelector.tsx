import React from "react";

import { View } from "react-native";

import { map } from "lodash";
import { useRecoilState } from "recoil";

import Button from "@/components/Button";
import Divider from "@/components/Divider";
import Text from "@/components/Text";
import { SIZE_LEVELS, SIZE_TEXT } from "@/constants/constants";
import { generateBoard } from "@/libs/game";
import { settingState } from "@/store/setting/atom";
import { COLORS } from "@/theme/colors";
import globalStyles from "@/theme/globalStyles";

const HomeLevelSelector = () => {
  const [setting, setSetting] = useRecoilState(settingState);

  const renderLevels = map(SIZE_LEVELS, (value) => {
    const isSelect = value === setting.level;
    const colorValue = isSelect ? COLORS.primary700 : COLORS.black;
    return (
      <Button
        fontSize={17}
        fontWeight="500"
        key={value}
        width="30%"
        height={50}
        buttonColor={colorValue}
        onPress={() => {
          setSetting({ ...setting, level: value, board: generateBoard(value) });
        }}
      >
        {SIZE_TEXT[value]}
      </Button>
    );
  });

  return (
    <View style={[globalStyles.alignCenter, globalStyles.justifyCenter, { width: "100%" }]}>
      <Text fontSize={20} fontWeight={500} color={COLORS.black}>
        난이도 설정 (현재: {SIZE_TEXT[setting.level]})
      </Text>
      <Divider vertical={20} />
      <View
        style={[
          globalStyles.justifyCenter,
          globalStyles.rowAlignCenterContainer,
          {
            width: "100%",
            gap: 10
          }
        ]}
      >
        {renderLevels}
      </View>
    </View>
  );
};

export default HomeLevelSelector;
