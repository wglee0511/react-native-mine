import { useCallback, useEffect, useRef } from "react";

import { useRecoilState } from "recoil";

import { TimeRefType } from "./type";

import { settingState } from "@/store/setting/atom";

const useTimer = () => {
  const [setting, setSetting] = useRecoilState(settingState);
  const intervalRef = useRef<TimeRefType>(null);

  const startTimer = useCallback(() => {
    if (intervalRef.current !== null) {
      return;
    }
    intervalRef.current = setInterval(() => {
      if (setting.status === "PLAYING") {
        setSetting((prevSetting) => ({ ...prevSetting, elapsedTime: prevSetting.elapsedTime + 1 }));
      }
    }, 1000);
  }, [setSetting, setting.status]);

  const stopTimer = useCallback(() => {
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  useEffect(() => {
    startTimer();

    return () => stopTimer();
  }, [startTimer, stopTimer]);
};

export default useTimer;
