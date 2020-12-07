import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";
import {
  StyleSheet,
  View,
  Text,
  Button,
  ActivityIndicator,
  FlatList,
  Platform,
  TouchableNativeFeedback,
  TouchableOpacity,
} from "react-native";
import { Picker } from "@react-native-community/picker";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import moment from "moment";

import AnnouncementTile from "../../components/ATComponents/AnnouncementTile";
import Links from "../../Links/Links";
import Colors from "../../constants/Colors";
import HeaderButton from "../../components/ATComponents/HeaderButton";

const AnnouncementScreen = (props) => {
  const [dOrW, setDOrW] = useState("");
  const [announcementArray, setAnnouncementArray] = useState();
  const announcements = [];
  const [isLoading, setIsLoading] = useState(false);
  const [cSESelected, setCSESelected] = useState(false);
  const [brokerSelected, setBrokerSelected] = useState(false);

  const [isVisible, setIsVisible] = useState(false);
  const [isWeekVisible, setIsWeekVisible] = useState(false);

  const getBrokerAnnouncements = async () => {
    try {
      const responseBrokerAnnouncements = await fetch(
        Links.mLink +
          "marketdetails?action=getBrokerAnnouncement&format=json&msgtype=BROKER"
      );

      const resDataBrokerAnnouncements = await responseBrokerAnnouncements.text();

      let replaceStringBrokerAnnouncements = resDataBrokerAnnouncements.replace(
        /'/g,
        '"'
      );
      let objectBrokerAnnouncements = JSON.parse(
        replaceStringBrokerAnnouncements
      );

      // console.log(objectBrokerAnnouncements);
    } catch (error) {
      throw error;
    }
  };

  const brokerHandler = () => {
    getBrokerAnnouncements();
    setCSESelected(false);
  };

  console.log(cSESelected);

  const cseHandler = () => {
    setCSESelected(true);
    setBrokerSelected(false);
  };

  const getOneDayAnnouncements = useCallback(async () => {
    try {
      const response = await fetch(
        Links.mLink +
          "marketdetails?action=getCSEAnnouncement&format=json&msgtype=CSE"
      );

      const resData = await response.text();
      let replaceString = resData.replace(/'/g, '"');
      let object = JSON.parse(replaceString);

      setAnnouncementArray(object.data.announcement);
    } catch (error) {
      throw error;
    }
  });

  const getWeekAnnouncements = useCallback(async () => {
    const weekAgo = moment().subtract(1, "week").calendar();
    const todayDate = moment(this.date).format("YYYY-MM-DD");

    try {
      const dateSplitArrayToday = todayDate.split("-");
      const dateSplitArrayWeek = weekAgo.split("/");

      const linkToday =
        dateSplitArrayToday[1] +
        "%2F" +
        dateSplitArrayToday[2] +
        "%2F" +
        dateSplitArrayToday[0];

      const linkWeek =
        dateSplitArrayWeek[0] +
        "%2F" +
        dateSplitArrayWeek[1] +
        "%2F" +
        dateSplitArrayWeek[2];

      const response = await fetch(
        Links.mLink +
          "marketdetails?action=getCSEAnnouncementHistory&format=json&msgType=CSE&fromDate=" +
          linkWeek +
          "&toDate=" +
          linkToday +
          "&security=&pageNumber=1"
      );

      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const resData = await response.text();
      let replaceString = resData.replace(/'/g, '"');
      let object = JSON.parse(replaceString);

      setAnnouncementArray(object.data.announcement);
    } catch (error) {
      throw error;
    }
  });

  const selectedDayHandler = async (itemData) => {
    setDOrW(itemData);
    if (itemData === "1Day") {
      setIsLoading(true);
      await getOneDayAnnouncements();
      setIsLoading(false);
    } else if (itemData === "7Day") {
      setIsLoading(true);
      await getWeekAnnouncements();
      setIsLoading(false);
    }
  };

  useLayoutEffect(() => {
    props.navigation.setOptions({
      headerRight: () => {
        return (
          <HeaderButtons HeaderButtonComponent={HeaderButton}>
            <Item
              iconName="ios-search"
              onPress={() => {
                props.navigation.navigate("SearchWindow");
              }}
            />
          </HeaderButtons>
        );
      },
    });
  });

  if (announcementArray) {
    for (const key in announcementArray) {
      announcements.push({
        announcement: announcementArray[key].announcement,
        date: announcementArray[key].date,
        securityId: announcementArray[key].msgSecurityId,
        title: announcementArray[key].subject,
      });
    }
  }

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View>
        <View>
          <Picker
            selectedValue={dOrW === "" ? selectedDayHandler("1Day") : dOrW}
            onValueChange={selectedDayHandler}
          >
            <Picker.Item label={"1 Day"} value={"1Day"} />
            <Picker.Item label={"7 Day"} value={"7Day"} />
          </Picker>
        </View>
        <View style={styles.buttonContainer}>
          <Button title="CSE" onPress={cseHandler} />
          <Button title="Broker" onPress={brokerHandler} />
        </View>
      </View>
      {!announcementArray && announcements.length !== 0 && !cSESelected && (
        <FlatList
          keyExtractor={(item, index) => index.toString()}
          data={announcements}
          renderItem={(itemData) => (
            <AnnouncementTile
              date={itemData.item.date}
              security={itemData.item.securityId}
              subject={itemData.item.title}
              onPress={() => setIsVisible(true)}
              modal={itemData.item.announcement}
            />
          )}
          contentContainerStyle={{
            paddingHorizontal: 10,
          }}
        />
      )}
      {!brokerSelected && (
        <View style={styles.centered}>
          <Text>No broker</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.white,
  },
  modalS: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 50,
  },
  modalContainer: {
    backgroundColor: "white",
    padding: 50,
    paddingVertical: 150,
  },
  container: {
    flex: 1,
  },
  touchable: {
    borderRadius: 50,
    overflow: "hidden",
  },
  buttonContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
});

export default AnnouncementScreen;
