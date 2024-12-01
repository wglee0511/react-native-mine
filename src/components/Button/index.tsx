import React, { useCallback } from "react";

import { Pressable, PressableStateCallbackType } from "react-native";

import Text from "../Text";

import { ButtonProps } from "./type";

import globalStyles from "@/theme/globalStyles";
import { RADIUS } from "@/theme/radius";

const Button = ({
  width = 100,
  disabled = false,
  radius = "base",
  children,
  height = 50,
  buttonColor = "black",
  fontSize,
  fontWeight,
  hasBackground = false,
  ...props
}: React.PropsWithChildren<ButtonProps>) => {
  const style = useCallback(
    ({ pressed }: PressableStateCallbackType) => [
      pressed && { opacity: 0.7 },
      globalStyles.alignCenter,
      globalStyles.justifyCenter,
      !hasBackground && {
        borderColor: buttonColor
      },
      hasBackground && {
        backgroundColor: buttonColor
      },
      {
        width,
        height,
        borderRadius: RADIUS[radius],
        borderWidth: 1,
        borderColor: buttonColor
      }
    ],
    [buttonColor, hasBackground, height, radius, width]
  );
  return (
    <Pressable
      // @ts-ignore
      style={style}
      disabled={disabled}
      {...props}
    >
      <Text fontSize={fontSize} fontWeight={fontWeight} color={buttonColor} textAlign="center">
        {children}
      </Text>
    </Pressable>
  );
};

export default Button;
