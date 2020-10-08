import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";

const SettingsScreen = (props) => {
  const [timePassed, setTimePasssed] = useState(false);

  const consoleFunc = () => {
    console.log("Ravindu");
  };

  setTimeout(() => setTimePasssed(!timePassed), 1500);
  if (!timePassed) {
    consoleFunc();
  }

  return (
    <View>
      <Text>SettingsScreen</Text>
    </View>
  );
};

const styles = StyleSheet.create({});

export default SettingsScreen;
