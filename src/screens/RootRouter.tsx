import React, { Suspense } from "react";

import { StatusBar, View } from "react-native";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import Home from "./Home";
import Main from "./Main";
import { RootStackParamList } from "./type";

import { Spinner } from "@/components/Spinner";
import globalStyles from "@/theme/globalStyles";

const MainStack = createNativeStackNavigator<RootStackParamList>();

const RootRouter = () => {
  const { top } = useSafeAreaInsets();
  return (
    <View
      style={[
        globalStyles.defaultFlexContainer,
        globalStyles.defaultBackgroundColor,
        { paddingTop: top }
      ]}
    >
      <StatusBar
        barStyle="dark-content"
        backgroundColor={globalStyles.defaultBackgroundColor.backgroundColor}
      />
      <Suspense fallback={<Spinner />} />
      <MainStack.Navigator initialRouteName="Home">
        <MainStack.Screen
          name="Home"
          component={Home}
          options={{ headerShown: false, animation: "default" }}
        />
        <MainStack.Screen
          name="Main"
          component={Main}
          options={{ headerShown: false, animation: "default" }}
        />
      </MainStack.Navigator>
    </View>
  );
};

export default RootRouter;
