import React, { StrictMode, useEffect } from "react";
import { Provider } from "react-redux";
import { store } from "./src/redux/store";
import { NavigationContainer } from "@react-navigation/native";
import * as Notifications from "expo-notifications";

import MainStack from "./src/navigation/MainStack";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowBanner: true,
    shouldShowList: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

function RootApp() {
  useEffect(() => {
    const getPermission = async () => {
      await Notifications.requestPermissionsAsync();
    };

    getPermission();
  }, []);

  return (
    <NavigationContainer>
      <MainStack />
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <StrictMode>
      <Provider store={store}>
        <RootApp />
      </Provider>
    </StrictMode>
  );
}