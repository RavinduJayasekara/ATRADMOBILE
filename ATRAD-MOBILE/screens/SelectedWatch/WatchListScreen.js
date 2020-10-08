import React, { useState, useEffect, useCallback } from "react";
import {
  StyleSheet,
  FlatList,
  Text,
  View,
  ActivityIndicator,
} from "react-native";
import { useSelector } from "react-redux";
import AllSecurityTile from "../../components/ATComponents/AllSecurityTile";

import Colors from "../../constants/Colors";
import Links from "../../Links/Links";
import Watch from "../../Links/Watch";

const WatchListScreen = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [allSecurities, setAllSecurities] = useState([]);
  const watchId = useSelector((state) => state.login.watchId);


  const getAllSecurities = useCallback(async () => {
    try {
      const response = await fetch(Links.mLink + Watch.allSecurityLink);
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const resData = await response.text();

      let replaceString = resData.replace(/'/g, '"');
      let object = JSON.parse(replaceString);

      setAllSecurities(object.data.items);
      // console.log(object.data.items);
    } catch (error) {
      throw error;
    }
  }, []);

  const loadAllSecurities = useCallback(async () => {
    setIsLoading(true);
    await getAllSecurities();
    setIsLoading(false);
  }, [setIsLoading]);

  useEffect(() => {
    loadAllSecurities();
  }, [loadAllSecurities]);

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  return (
    <FlatList
      contentContainerStyle={{ marginHorizontal: 5, paddingHorizontal: 5 }}
      data={allSecurities}
      renderItem={(itemData) => (
        <AllSecurityTile
          cSecurity={itemData.item.security}
          cName={itemData.item.securityDes}
          watchID={watchId}
        />
      )}
      keyExtractor={(item, index) => item.security}
    />
  );
};

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default WatchListScreen;
