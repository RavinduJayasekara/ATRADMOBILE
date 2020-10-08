import React, { useState, useCallback, useEffect } from "react";
import {
  View,
  Button,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../../constants/Colors";
import SelectedWatchTile from "../../components/ATComponents/SelectedWatchTile";
import Links from "../../Links/Links";
import { useDispatch, useSelector } from "react-redux";
import * as loginActions from "../../store/action/login";

const SelectedWatchScreen = (props) => {
  const [array, setArray] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  // const [watchId, setWatchId] = useState("");

  const dispatch = useDispatch();

  const setWatch = useSelector((state) => state.login.watchId);

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

  useEffect(() => {
    setIsLoading(true);
    dispatch(loginActions.login());
    setIsLoading(false);
  }, [dispatch, setIsLoading]);

  return (
    <View style={{ flex: 1 }}>
      <View>
        <TouchableOpacity
          onPress={() => props.navigation.navigate("WatchListScreen")}
        >
          <View style={{ flexDirection: "row", alignItems: "flex-end" }}>
            <Ionicons name="ios-search" size={25} color={Colors.accent} />
            <Text style={{ fontSize: 20 }}>Select Symbol/Company Name</Text>
          </View>
        </TouchableOpacity>
      </View>
      <Button title="getData" onPress={getData.bind(this, setWatch)} />
      <FlatList
        contentContainerStyle={{ marginHorizontal: 10 }}
        data={array}
        renderItem={(itemData) => (
          <SelectedWatchTile
            cSecurity={itemData.item.security}
            cName={itemData.item.companyname}
            cLowpx={itemData.item.lowpx}
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
          />
        )}
        keyExtractor={(item, index) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({});

export default SelectedWatchScreen;
