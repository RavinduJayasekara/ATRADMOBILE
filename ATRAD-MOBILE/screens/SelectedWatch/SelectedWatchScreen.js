import React, { useState, useCallback, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  ActivityIndicator,
} from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../../constants/Colors";
import SelectedWatchTile from "../../components/ATComponents/SelectedWatchTile";
import Links from "../../Links/Links";
import { useDispatch, useSelector } from "react-redux";
import HeaderButton from "../../components/ATComponents/HeaderButton";

const SelectedWatchScreen = (props) => {
  const [array, setArray] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const setWatch = useSelector((state) => state.auth.watchId);

  const deleteSelectedWatchTile = async (security) => {
    try {
      const response = await fetch(
        Links.mLink +
          "watch?action=deleteUserSecurity&format=json&exchange=CSE&bookDefId=1&securityid=" +
          security +
          "&watchId=" +
          setWatch
      );

      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const resData = await response.text();

      let replaceString = resData.replace(/'/g, '"');
      let object = JSON.parse(replaceString);

      loadData();
    } catch (err) {
      throw err;
    }
  };

  const getData = useCallback(
    async (watchIdUser) => {
      try {
        const response = await fetch(
          Links.mLink +
            "watch?action=userWatch&format=json&size=10&exchange=CSE&bookDefId=1&watchId=" +
            watchIdUser +
            "&lastUpdatedId=0"
        );

        if (!response.ok) {
          throw new Error("Something went wrong!");
        }

        const resData = await response.text();

        let replaceString = resData.replace(/'/g, '"');
        let object = JSON.parse(replaceString);

        setArray(object.data.watch);
      } catch (err) {
        throw err;
      }
    },
    [setArray]
  );

  const loadData = useCallback(async () => {
    setIsLoading(true);
    await getData(setWatch);
    setIsLoading(false);
  }, [setIsLoading, getData]);

  useEffect(() => {
    props.navigation.setOptions({
      headerRight: () => {
        return (
          <HeaderButtons HeaderButtonComponent={HeaderButton}>
            <Item
              iconName="ios-search"
              onPress={() => {
                props.navigation.navigate("SearchStackNavigator");
              }}
            />
          </HeaderButtons>
        );
      },
    });
    props.navigation.addListener("focus", loadData);
  }, [loadData]);

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.comName}>
        <TouchableOpacity
          onPress={() => props.navigation.navigate("WatchListScreen")}
        >
          <View style={{ flexDirection: "row", alignItems: "flex-end" }}>
            <View style={styles.icon}>
              <Ionicons name="ios-search" size={25} color={"white"} />
            </View>
            <Text style={{ fontSize: 20, color: "white" }}>
              Select Symbol/Company Name
            </Text>
          </View>
        </TouchableOpacity>
      </View>
      <FlatList
        onRefresh={loadData}
        refreshing={isLoading}
        contentContainerStyle={{ padding: 10 }}
        data={array}
        renderItem={(itemData) => (
          <SelectedWatchTile
            cSecurity={itemData.item.security}
            cName={itemData.item.companyname}
            cTradePrice={itemData.item.tradeprice}
            cNetChange={itemData.item.netchange}
            cPerChange={itemData.item.perchange}
            onPress={() =>
              props.navigation.navigate("CompanyDetailsScreen", {
                secCode: itemData.item.security,
                companyname: itemData.item.companyname,
                lastpx: itemData.item.lastpx,
                lowpx: itemData.item.lowpx,
                highpx: itemData.item.highpx,
                totvolume: itemData.item.totvolume,
                tradeprice: itemData.item.tradeprice,
                totturnover: itemData.item.totturnover,
                netchange: itemData.item.netchange,
                perchange: itemData.item.perchange,
              })
            }
            removeHandler={deleteSelectedWatchTile.bind(
              this,
              itemData.item.security
            )}
          />
        )}
        keyExtractor={(item, index) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  comName: {
    backgroundColor: Colors.none,
    margin: 10,
    padding: 10,
    borderRadius: 10,
    overflow: "hidden",
  },
  icon: {
    marginHorizontal: 10,
  },
});

export default SelectedWatchScreen;
