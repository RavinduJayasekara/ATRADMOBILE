import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  TouchableNativeFeedback,
} from "react-native";
import Card from "../UI/Card";
import DefaultText from "../UI/DefaultText";

const WatchTile = (props) => {
  let TouchableCmp = TouchableOpacity;

  if (Platform.OS === "android") {
    TouchableCmp = TouchableNativeFeedback;
  }

  return (
    <Card style={styles.container}>
      <TouchableCmp onPress={props.onPress}>
        <View style={styles.detailContainer}>
          <View style={{ width: "44%" }}>
            <Text style={{ fontSize: 20 }}>{props.cSecurity}</Text>
            <DefaultText numberOfLines={1}>{props.cName}</DefaultText>
          </View>
          <View style={{ width: "22%" }}>
            <Text>{props.cLowpx}</Text>
          </View>
          <View style={{ alignItems: "flex-end" }}>
            <Text>{props.cNetChange}</Text>
            <Text>{props.cPerChange}</Text>
          </View>
        </View>
      </TouchableCmp>
    </Card>
  );
};

const styles = StyleSheet.create({
  detailContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
  },
  container: {
    overflow: Platform.OS === "android" ? "hidden" : "visible",
  },
});

export default WatchTile;
