import React, { useCallback, useRef } from "react";

import { Pressable, TextInput, View } from "react-native";

import { isNaN } from "lodash";
import { useRecoilState, useRecoilValue } from "recoil";

import Divider from "@/components/Divider";
import Text from "@/components/Text";
import { settingState } from "@/store/setting/atom";
import { maxMineNumberState } from "@/store/setting/selector";
import { COLORS } from "@/theme/colors";
import globalStyles from "@/theme/globalStyles";

import "./styles.css";

const HomeMineSelector = () => {
  const inputRef = useRef<TextInput>(null);
  const [setting, setSetting] = useRecoilState(settingState);
  const maxMineNumber = useRecoilValue(maxMineNumberState);

  const onPressContainer = useCallback(() => {
    inputRef?.current?.focus?.();
  }, []);

  const onChangeMine = useCallback(
    (text: string) => {
      const value = Number(text);
      if (isNaN(value)) {
        return;
      }
      if (value > maxMineNumber) {
        return;
      }
      setSetting({ ...setting, mineNumber: text === "" ? 0 : Number(text) });
    },
    [maxMineNumber, setSetting, setting]
  );

  return (
    <View
      style={[globalStyles.rowAlignCenterContainer, globalStyles.justifyCenter, { width: "100%" }]}
    >
      <Text fontSize={20} fontWeight={500} color={COLORS.black}>
        지뢰 개수(최대: {maxMineNumber}) :
      </Text>
      <Divider horizontal={10} />
      <Pressable
        style={({ pressed }) => [
          [
            pressed && { opacity: 0.7 },
            {
              width: "30%",
              height: 50,
              justifyContent: "center",
              alignItems: "center",
              borderWidth: 1,
              borderRadius: 15,
              paddingHorizontal: 10
            }
          ]
        ]}
        onPress={onPressContainer}
      >
        <TextInput
          ref={inputRef}
          value={String(setting.mineNumber)}
          style={[
            { width: "100%", fontSize: 20 },
            globalStyles.justifyCenter,
            globalStyles.alignCenter
          ]}
          placeholderTextColor={COLORS.primary700}
          selectionColor={COLORS.primary700}
          onChangeText={onChangeMine}
          keyboardType="number-pad"
          inputMode="numeric"
        />
      </Pressable>
    </View>
  );
};

export default HomeMineSelector;
