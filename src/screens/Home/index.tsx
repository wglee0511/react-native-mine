import React from "react";

import { View } from "react-native";

import { useNavigation } from "@react-navigation/native";

import { NavigationProp } from "../type";

import Button from "@/components/Button";
import Divider from "@/components/Divider";
import Text from "@/components/Text";
import HomeLevelSelector from "@/containers/Home/HomeLevelSelector";
import HomeMineSelector from "@/containers/Home/HomeMineSelector";
import { COLORS } from "@/theme/colors";
import globalStyles from "@/theme/globalStyles";

const Home = () => {
  const navigation = useNavigation<NavigationProp>();

  return (
    <View
      style={[
        globalStyles.defaultFlexContainer,
        globalStyles.alignCenter,
        globalStyles.justifyCenter,
        globalStyles.defaultBackgroundColor
      ]}
    >
      <Text fontSize={40} fontWeight={500} color={COLORS.black}>
        지뢰찾기
      </Text>
      <Divider vertical={50} />
      <HomeLevelSelector />
      <Divider vertical={20} />
      <HomeMineSelector />
      <Divider vertical={50} />
      <Button
        fontSize={20}
        fontWeight="500"
        width="50%"
        height="7%"
        buttonColor={COLORS.primary700}
        onPress={() => {
          navigation.navigate("Main");
        }}
      >
        시작하기
      </Button>
    </View>
  );
};

export default Home;
