import React, { useCallback, useEffect, useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";

import OrderList from "../../Links/OrderList";
import Links from "../../Links/Links";

const allArray = [
  { label: "NEW", value: "NEW" },
  { label: "P.FILLED", value: "P.FILLED" },
  { label: "FILLED", value: "FILLED" },
  { label: "CANCELLED", value: "CANCELLED" },
  { label: "AMENDED", value: "AMENDED" },
  { label: "QUEUED", value: "QUEUED" },
  { label: "Q.AMEND", value: "Q.AMEND" },
  { label: "EXPIRED", value: "EXPIRED" },
  { label: "REJECTED", value: "REJECTED" },
  { label: "PENDING", value: "PENDING" },
];

const OrderListScreen = (props) => {
  const [allClients, setAllClients] = useState([]);

  const getDropDownInfo = useCallback(() => {
    var request = new XMLHttpRequest();
    request.onreadystatechange = (e) => {
      if (request.readyState !== 4) {
        return;
      }
      if (request.status === 200) {
        let string = request.responseText;
        let replaceString = string.replace(/'/g, '"');
        let object = JSON.parse(replaceString);
        const userIds = object.data.userids;
        let arrayList = [];
        for (const key in userIds) {
          arrayList.push({
            label:
              userIds[key].clientCode +
              " (" +
              userIds[key].initials +
              userIds[key].lastName +
              ")",
            value: userIds[key].clientCode,
          });
        }
        console.log(arrayList);
        setAllClients(arrayList);
      } else {
        console.warn("error" + "\n\n\n");
      }
    };

    request.open("GET", Links.mLink + OrderList.orderLink, true);
    request.setRequestHeader(
      "Content-Type",
      "application/x-www-form-urlencoded"
    );
    request.send();
  }, []);

  useEffect(() => {
    getDropDownInfo();
  }, []);

  return (
    <View>
      <View style={styles.dropDownContainer}>
        <DropDownPicker
          items={allClients}
          containerStyle={{ width: "50%", height: 50, borderRadius: 25 }}
          itemStyle={{ justifyContent: "flex-start" }}
          style={{ borderRadius: 25 }}
          placeholder="All Clients"
        />
        <DropDownPicker
          items={allArray}
          containerStyle={{ width: "50%", height: 50 }}
          placeholder="All"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  dropDownContainer: {
    flexDirection: "row",
    margin: 5,
  },
});

export default OrderListScreen;
