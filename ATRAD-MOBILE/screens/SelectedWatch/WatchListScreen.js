import React, { useState, useEffect, useCallback } from "react";
import {
  StyleSheet,
  FlatList,
  Text,
  View,
  ActivityIndicator,
  Platform,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { SearchBar } from "react-native-elements";

import AllSecurityTile from "../../components/ATComponents/AllSecurityTile";
import Colors from "../../constants/Colors";
import * as dropdownAllSecurities from "../../store/action/dropdownsecurities";

const WatchListScreen = (props) => {
  const watchId = useSelector((state) => state.auth.watchId);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [searchWord, setSearchWord] = useState("");
  const allSecurities = useSelector(
    (state) => state.dropdownsecurities.securityDetails
  );

  const securityDetails = useSelector(
    (state) => state.dropdownsecurities.securityDetails
  );
  const [searchedSecurities, setSearchedSecurities] = useState([]);

  const searchHandler = (text) => {
    setSearchWord(text);
    let securityToUpperCase = text.toUpperCase();
    // const filteredSecuritities = allSecurities.filter((sec) =>
    //   sec.match(securityToUpperCase, "g")
    // );

    const filteredSecuritities = allSecurities.filter((sec) =>
      sec.security.match(securityToUpperCase, "g")
    );

    setSearchedSecurities(filteredSecuritities);
  };

  const loadAllSecurities = useCallback(async () => {
    setIsLoading(true);
    await dispatch(dropdownAllSecurities.fetchDropDownAllSecurities());
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
    <View style={styles.container}>
      <SearchBar
        platform={Platform.OS === "android" ? "android" : "ios"}
        placeholder={"Type Here..."}
        onChangeText={searchHandler}
        value={searchWord}
      />
      <FlatList
        contentContainerStyle={{ marginHorizontal: 5, paddingHorizontal: 5 }}
        data={searchWord === "" ? allSecurities : searchedSecurities}
        renderItem={(itemData) => (
          <AllSecurityTile
            cSecurity={itemData.item.security}
            cName={itemData.item.securityDes}
            watchID={watchId}
          />
        )}
        keyExtractor={(item, index) => item.security}
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
  container: {
    flex: 1,
  },
});

export default WatchListScreen;
