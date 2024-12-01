import React, { useCallback, useRef } from "react";

import { View } from "react-native";

import { BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet";
import { useNavigation } from "@react-navigation/native";
import { map } from "lodash";
import { useRecoilState, useRecoilValue } from "recoil";

import useTimer from "@/hooks/useTimer";

import { NavigationProp } from "@/screens/type";

import Button from "@/components/Button";
import Divider from "@/components/Divider";
import Icon from "@/components/Icon";
import Text from "@/components/Text";
import { SIZE_LEVELS, SIZE_TEXT } from "@/constants/constants";
import { alertMessage } from "@/libs/alert";
import { generateBoard } from "@/libs/game";
import { modalState } from "@/store/modal/atom";
import { initialSettingState, settingState } from "@/store/setting/atom";
import { mineRemainNumberState, resultMessageState } from "@/store/setting/selector";
import { COLORS } from "@/theme/colors";
import globalStyles from "@/theme/globalStyles";
import { RADIUS } from "@/theme/radius";

const MainTopNavigation = () => {
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  const navigation = useNavigation<NavigationProp>();
  const [modal, setModal] = useRecoilState(modalState);
  const [setting, setSetting] = useRecoilState(settingState);
  const resultMessage = useRecoilValue(resultMessageState);
  const mineRemainNumber = useRecoilValue(mineRemainNumberState);

  const handlePresentModalPress = useCallback(() => {
    if (modal.isOpenGameSettingBottomSheet) {
      bottomSheetModalRef.current?.dismiss();
      setModal({ isOpenGameSettingBottomSheet: false });
    } else {
      bottomSheetModalRef.current?.present();
      setModal({ isOpenGameSettingBottomSheet: true });
    }
  }, [modal, setModal]);

  const handleSheetChanges = useCallback(
    (index: number) => {
      if (index === -1) {
        setModal({ isOpenGameSettingBottomSheet: false });
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [setModal, modal]
  );
  const renderLevels = map(SIZE_LEVELS, (value) => {
    const isSelect = value === setting.level;
    const colorValue = isSelect ? COLORS.primary700 : COLORS.black;
    return (
      <Button
        fontSize={17}
        fontWeight="500"
        key={value}
        width="90%"
        height={50}
        buttonColor={colorValue}
        disabled={isSelect}
        onPress={() => {
          setSetting({
            ...setting,
            level: value,
            board: generateBoard(value),
            status: "READY",
            elapsedTime: 0
          });
          handlePresentModalPress();
        }}
      >
        {SIZE_TEXT[value]}
      </Button>
    );
  });

  useTimer();

  return (
    <View
      style={[
        globalStyles.rowAlignCenterContainer,
        globalStyles.justifySpaceBetween,
        { width: "100%", paddingHorizontal: 20, paddingVertical: 10 }
      ]}
    >
      <View
        style={[
          { backgroundColor: COLORS.black, borderRadius: RADIUS.base, width: "30%" },
          globalStyles.justifyCenter,
          globalStyles.alignCenter
        ]}
      >
        <Text fontSize={30} fontWeight="500" color={COLORS.red500} textAlign="center">
          {mineRemainNumber}
        </Text>
      </View>

      <Button
        hasBackground
        width={50}
        height={50}
        buttonColor={COLORS.yellow200}
        onPress={() => handlePresentModalPress()}
      >
        <Icon icon="Smile" size={48} color={COLORS.black} />
      </Button>
      <View
        style={[
          { backgroundColor: COLORS.black, borderRadius: RADIUS.base, width: "30%" },
          globalStyles.justifyCenter,
          globalStyles.alignCenter
        ]}
      >
        <Text fontSize={30} fontWeight="500" color={COLORS.red500} textAlign="center">
          {setting.elapsedTime}
        </Text>
      </View>
      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={1}
        snapPoints={["25%", "60%"]}
        onChange={handleSheetChanges}
      >
        <BottomSheetView style={{ flex: 1, alignItems: "center", gap: 10 }}>
          <Divider vertical={20} />
          {renderLevels}
          <Button
            fontSize={20}
            fontWeight="500"
            width="90%"
            height={50}
            buttonColor={COLORS.black}
            onPress={() => {
              setSetting((prevSetting) => ({
                ...initialSettingState,
                board: generateBoard(prevSetting.level),
                level: prevSetting.level,
                mineNumber: prevSetting.mineNumber
              }));
              handlePresentModalPress();
            }}
          >
            다시하기
          </Button>
          <Button
            fontSize={20}
            fontWeight="500"
            width="90%"
            height={50}
            buttonColor={COLORS.black}
            onPress={() => {
              alertMessage(resultMessage, "결과");
              handlePresentModalPress();
              setSetting(initialSettingState);
              navigation.goBack();
            }}
          >
            종료하기
          </Button>
        </BottomSheetView>
      </BottomSheetModal>
    </View>
  );
};

export default MainTopNavigation;
