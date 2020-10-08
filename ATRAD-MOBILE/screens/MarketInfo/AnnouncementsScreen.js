import React from "react";
import { StyleSheet, View, Text, Button } from "react-native";

import AnnouncementTile from "../../components/ATComponents/AnnouncementTile";

const AnnouncementScreen = (props) => {
  return (
    <View>
      <Text>AnnouncementScreen</Text>
      <View>
        <Text>DropDown 1 Day Or 7 Days</Text>
      </View>
      <View>
        <Button title="CSE" onPress = {() => {console.log('CSE')}} />
        <Button title="broker" onPress = {() => {console.log('Broker')}} />
      </View>
      <View>
        <AnnouncementTile />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({});

export default AnnouncementScreen;
