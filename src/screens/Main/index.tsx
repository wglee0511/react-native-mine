import React from "react";

import { View } from "react-native";

import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";

import Divider from "@/components/Divider";
import MainContents from "@/containers/Main/MainContents";
import MainTopNavigation from "@/containers/Main/MainTopNavigation";
import { COLORS } from "@/theme/colors";
import globalStyles from "@/theme/globalStyles";

const Main = () => (
  <BottomSheetModalProvider>
    <View
      style={[
        globalStyles.defaultFlexContainer,
        globalStyles.alignCenter,
        globalStyles.defaultBackgroundColor
      ]}
    >
      <MainTopNavigation />
      <Divider vertical={2} horizontal="100%" backgroundColor={COLORS.black} />
      <MainContents />
    </View>
  </BottomSheetModalProvider>
);

export default Main;
