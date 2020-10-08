import React from "react";
import { Text, View, StyleSheet, Button } from "react-native";

const ChartScreen = (props) => {
  return (
    <View>
      <View>
        <Button />
        <Button />
      </View>
      <View style={styles.dropDownContainer}>
        <Text>Dropdown Company</Text>
        <Text>Dropdown</Text>
        <Text>Dropdown Chart</Text>
      </View>
      <View>
        <Text>Chart</Text>
        <Text>Chart</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  dropDownContainer: {
    flexDirection: "row",
  },
});

export default ChartScreen;
