import React, { useCallback, useLayoutEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  ActivityIndicator,
  FlatList,
} from "react-native";
import moment from "moment";

import Links from "../../Links/Links";
import Colors from "../../constants/Colors";
import Card from "../../components/UI/Card";
import DefaultText from "../../components/UI/DefaultText";

const IndicesSummary = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [indexSecArray, setIndexSecArray] = useState([]);

  const fetchIndicesSummary = async () => {
    const dateLink = moment(this.date).format("YYYY-MM-DD");

    const usableDate = dateLink.split("-");

    try {
      const response = await fetch(
        Links.mLink +
          "marketdetails?action=getMarketIndexSummary&format=json&tradeDate=" +
          usableDate[1] +
          "%2F" +
          usableDate[2] +
          "%2F" +
          usableDate[0]
      );

      if (!response.ok) {
        throw new Error("Something went wrong!");
      }
      const resData = await response.text();

      let replaceString = resData.replace(/'/g, '"');
      let object = JSON.parse(replaceString);
      setIndexSecArray(object.data.index);
    } catch (error) {
      throw error;
    }
  };
  const loadIndicesData = useCallback(async () => {
    setIsLoading(true);
    await fetchIndicesSummary();
    setIsLoading(false);
  }, [setIsLoading]);
  useLayoutEffect(() => {
    loadIndicesData();
  }, [setIsLoading]);

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  const renderItemHandler = (itemData) => {
    return (
      <Card style={styles.cardContainer}>
        <View style={{ width: "40%" }}>
          <DefaultText>{itemData.item.sector}</DefaultText>
          <DefaultText>{itemData.item.description}</DefaultText>
        </View>
        <View style={{ width: "35%" }}>
          <DefaultText>{itemData.item.totVolume}</DefaultText>
          <DefaultText>{itemData.item.totTurnOver}</DefaultText>
        </View>
        <View style={{ width: "25%", alignItems: "center" }}>
          <DefaultText>{itemData.item.change}</DefaultText>
          <DefaultText>{itemData.item.perChange}</DefaultText>
        </View>
      </Card>
    );
  };

  if (indexSecArray) {
    <View style={styles.centered}>
      <Text>Market Data is not updated for today</Text>
    </View>;
  }

  return (
    <View style={styles.container}>
      <View style={{ width: "100%", flexDirection: "row" }}>
        <View style={{ width: "40%" }}>
          <DefaultText>Name</DefaultText>
        </View>
        <View style={{ width: "35%" }}>
          <DefaultText>Volume</DefaultText>
          <DefaultText>TurnOver</DefaultText>
        </View>
        <View style={{ width: "25%", alignItems: "flex-end" }}>
          <DefaultText>Change</DefaultText>
          <DefaultText>Change %</DefaultText>
        </View>
      </View>

      <FlatList
        onRefresh={loadIndicesData}
        refreshing={isLoading}
        contentContainerStyle={{ marginHorizontal: 10 }}
        data={indexSecArray}
        renderItem={renderItemHandler}
        keyExtractor={(item) => item.sector}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  cardContainer: {
    flexDirection: "row",
    padding: 5,
  },
});

export default IndicesSummary;
