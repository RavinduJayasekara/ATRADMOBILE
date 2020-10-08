import React, { useState, useCallback, useEffect } from "react";
import {
  StyleSheet,
  View,
  ActivityIndicator,
  Text,
  TextInput,
} from "react-native";
import { Picker } from "@react-native-community/picker";

import Colors from "../../constants/Colors";
import { useDispatch, useSelector } from "react-redux";
import * as dropdownActions from "../../store/action/dropdownclient";

const BuyScreen = (props) => {
  const dispatch = useDispatch();
  const allSecurities = useSelector((state) => state.dropdownsecurities.securityDetails);
  const [isLoading, setIsLoading] = useState(false);

  const dropDownArray = [];

  for (const key in allSecurities) {
    dropDownArray.push({
      label: allSecurities[key].security,
      value: allSecurities[key].security,
    });
  }

  const loadAllSecurities = useCallback(async () => {
    setIsLoading(true);
    await dispatch(dropdownActions.fetchDropDownAllSecurities());
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
      <View style={styles.pickerContainer}>
        {dropDownArray.length !== 0 ? (
          <Picker
            style={{ backgroundColor: "white" }}
            onValueChange
            selectedValue
          >
            {dropDownArray.map((item, index) => (
              <Picker.Item label={item.label} value={item.value} key={index} />
            ))}
          </Picker>
        ) : (
          <View style={styles.centered}>
            <ActivityIndicator size="large" color={Colors.primary} />
          </View>
        )}
      </View>
      <View>
        <Text></Text>
      </View>
      <View></View>
      {/* <Card style={styles.cardContainer}>
        <View>
          <View style={styles.pickerContainer}>
            <Picker>
              <Picker.Item />
            </Picker>
          </View>
          <View>
            <Text>Price</Text>
            <TextInput value={} onChangeText={} />
          </View>
          <View>
            <Text>Buying Power</Text>
            <Text>{}</Text>
            <Text>Commision</Text>
            <Text>{}</Text>
          </View>
        </View>
        <View>
          <View style={styles.pickerContainer}>
            <Picker>
              <Picker.Item />
            </Picker>
          </View>
          <View>
            <Text>Quantity</Text>
            <TextInput value={} onChangeText={} />
          </View>
          <View>
            <Text>Order Value</Text>
            <Text>{}</Text>
            <Text>Net Value</Text>
            <Text>{}</Text>
          </View>
        </View>
      </Card> */}
    </View>
  );
};

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {},
  cardContainer: {
    flexDirection: "row",
  },
});

export default BuyScreen;
