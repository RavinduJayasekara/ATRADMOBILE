import React, { useCallback, useState, useLayoutEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  Button,
  Modal,
  ScrollView,
  TouchableHighlight,
  Platform,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import TitleText from "../../components/UI/TitleText";
import MarketInfo from "../../Links/MarketInfo";
import Links from "../../Links/Links";
import DefaultText from "../../components/UI/DefaultText";
import Card from "../../components/UI/Card";
import Colors from "../../constants/Colors";

const MarketInfoScreen = (props) => {
  const [marketInfoDetails, setMarketInfoDetails] = useState([]);
  const [marketStatus, setMarketStatus] = useState();
  const [marketDropDown, setMarketDropDown] = useState([]);
  const [visible, setVisible] = useState(false);
  const [sectors, setSectors] = useState("ASI");
  const [chartData, setChartData] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const getMarketInfo = useCallback(async () => {
    try {
      const response = await fetch(Links.mLink + MarketInfo.sectorLink);

      if (!response.ok) {
        throw new Error("Something went wrong");
      }

      const resData = await response.text();

      let replaceString = resData.replace(/'/g, '"');
      let object = JSON.parse(replaceString);
      setMarketInfoDetails(object.data.sector);
    } catch (error) {
      throw error;
    }
  }, []);
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
    } catch (error) {
      throw error;
    }
  }, []);

  const getMarketStatus = useCallback(() => {
    var request = new XMLHttpRequest();
    request.onreadystatechange = (e) => {
      if (request.readyState !== 4) {
        return;
      }
      if (request.status === 200) {
        let string = request.responseText;
        let replaceString = string.replace(/'/g, '"');
        let object = JSON.parse(replaceString);
        setMarketStatus(object.data.status);
      } else {
        console.warn("error" + "\n\n\n");
      }
    };

    request.open("GET", Links.mLink + MarketInfo.statusLink, true);
    request.setRequestHeader(
      "Content-Type",
      "application/x-www-form-urlencoded"
    );
    request.send();
  }, [setMarketStatus]);

  const getDropDownDetails = useCallback(() => {
    var request = new XMLHttpRequest();
    request.onreadystatechange = (e) => {
      if (request.readyState !== 4) {
        return;
      }
      if (request.status === 200) {
        let string = request.responseText;
        let replaceString = string.replace(/'/g, '"');
        let object = JSON.parse(replaceString);
        const sectorValues = object.data.indices;
        let arrayList = [];
        for (const key in sectorValues) {
          arrayList.push({
            label: sectorValues[key].sector,
            value: sectorValues[key].sector,
          });
        }
        setMarketDropDown(arrayList);
      } else {
        console.warn("error" + "\n\n\n");
      }
    };

    request.open("GET", Links.mLink + MarketInfo.marketDetailsLink, true);
    request.setRequestHeader(
      "Content-Type",
      "application/x-www-form-urlencoded"
    );
    request.send();
  }, []);

  const getChartData = useCallback(() => {
    var request = new XMLHttpRequest();
    request.onreadystatechange = (e) => {
      if (request.readyState !== 4) {
        return;
      }
      if (request.status === 200) {
        let string = request.responseText;
        let replaceString = string.replace(/'/g, '"');
        let object = JSON.parse(replaceString);
        // const sectorValues = object.data.indices;
        // let arrayList = [];
        // for (const key in sectorValues) {
        //   arrayList.push({
        //     label: sectorValues[key].sector,
        //     value: sectorValues[key].sector,
        //   });
        // }
        // setMarketDropDown(arrayList);
      } else {
        console.warn("error" + "\n\n\n");
      }
    };

    request.open("GET", Links.mLink + MarketInfo.chartDetailsLink, true);
    request.setRequestHeader(
      "Content-Type",
      "application/x-www-form-urlencoded"
    );
    request.send();
  }, []);

  useLayoutEffect(() => {}, []);

  useLayoutEffect(() => {
    const loadMarketInfo = async () => {
      setIsLoading(true);
      await getMarketInfo();
      await getMarketStatus();
      await getDropDownDetails();
      await getChartData();
      setIsLoading(false);
    };
    loadMarketInfo();
  }, []);

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  const sectorHandling = (item, index) => {
    setSectors(item.label);
    setVisible(!visible);
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.headerTitle}>
          <TitleText>Colombo Stock Exchange</TitleText>
        </View>

        {marketInfoDetails &&
          marketInfoDetails.map((item, index) => (
            <View style={styles.informationContainer} key={index}>
              <View style={styles.valueContainer}>
                <View style={styles.titleContainer}>
                  <TitleText>TurnOver</TitleText>
                  <Text>{item.totTurnOver}</Text>
                </View>
                <View style={styles.titleContainer}>
                  <TitleText>Volume</TitleText>
                  <Text>{item.totVolume}</Text>
                </View>
              </View>
              <View style={styles.valueContainer}>
                <View style={styles.titleContainer}>
                  <TitleText>Symbol Traded</TitleText>
                  <Text>{item.totTrades}</Text>
                </View>
                <View style={styles.titleContainer}>
                  <TitleText>Market Status</TitleText>
                  <Text
                    style={{ color: marketStatus === "Open" ? "green" : "red" }}
                  >
                    {marketStatus}
                  </Text>
                </View>
              </View>
            </View>
          ))}
        <Card style={styles.midSectionContainer}>
          <View style={styles.midSection}>
            <Modal
              visible={visible}
              animationType="slide"
              presentationStyle="pageSheet"
            >
              <View
                style={
                  Platform.OS === "android"
                    ? {}
                    : { marginVertical: 25, marginHorizontal: 10 }
                }
              >
                <ScrollView>
                  {marketDropDown.map((item, index) => (
                    <TouchableHighlight
                      key={index}
                      onPress={sectorHandling.bind(this, item, index)}
                    >
                      <DefaultText>{item.label}</DefaultText>
                    </TouchableHighlight>
                  ))}
                </ScrollView>
              </View>
            </Modal>
            <TouchableHighlight
              style={styles.openButton}
              onPress={() => {
                setVisible(true);
              }}
            >
              <Text>{sectors}</Text>
            </TouchableHighlight>
          </View>
          <View style={styles.midSection}>
            <Text></Text>
            <Text></Text>
          </View>
        </Card>
        <View style={styles.chartContainer}>
          <View style={{ flexDirection: "row", width: "100%" }}>
            <View style={{ width: "67%", alignItems: "flex-end" }}>
              <Text>ASI INTRA DAY CHART</Text>
            </View>
            <View style={{ width: "33%", alignItems: "flex-end" }}>
              <Ionicons name="ios-menu" size={25} color={"#ccc"} />
            </View>
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <Button
            title="Market Summary"
            onPress={() => {
              props.navigation.navigate("MarketSummaryStackNavigator");
            }}
          />
          <Button
            title="Top Stocks"
            onPress={() => {
              props.navigation.navigate("TopStocksStackNavigator");
            }}
          />
          <Button
            title="Announcements"
            onPress={() => {
              props.navigation.navigate("AnnouncementsScreen");
            }}
          />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  valueContainer: {
    flexDirection: "row",
    paddingVertical: 10,
  },
  titleContainer: {
    width: "50%",
  },
  chartContainer: {
    margin: 10,
    backgroundColor: "white",
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.26,
    shadowRadius: 8,
    elevation: 8,
    borderRadius: 10,
    height: 300,
    padding: 6,
  },
  midSectionContainer: {
    padding: 5,
    margin: 10,
    flexDirection: "row",
  },
  midSection: {
    width: "50%",
    paddingHorizontal: 2,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  headerTitle: {
    alignItems: "center",
    marginVertical: 10,
  },
  informationContainer: {
    margin: 10,
    backgroundColor: "white",
    borderRadius: 10,
    padding: 5,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.26,
    shadowRadius: 8,
    elevation: 8,
  },
  container: {
    flex: 1,
  },
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 10,
    padding: 10,
    elevation: 2,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default MarketInfoScreen;
