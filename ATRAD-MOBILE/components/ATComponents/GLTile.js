import React from "react";
import { StyleSheet, View } from "react-native";
import DefaultText from "../UI/DefaultText";
import Card from "../UI/Card";

const GLTile = (props) => {
  return (
    <Card style={{ flexDirection: "row", padding: 7 }}>
      <View style={{ width: "50%" }}>
        <DefaultText>{props.security}</DefaultText>
        <DefaultText numberOfLines={1}>{props.companyname}</DefaultText>
      </View>
      <View
        style={{
          width: "50%",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <DefaultText>{props.tradeprice}</DefaultText>
        <DefaultText>{props.perchange}%</DefaultText>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({});

export default GLTile;
