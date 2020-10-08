import React from "react";
import { HeaderButton } from "react-navigation-header-buttons";
import { Ionicons } from "@expo/vector-icons";

const CustomHeaderButton = (props) => {
  return (
    <HeaderButton
      {...props}
      iconSize={25}
      color="#ccc"
      IconComponent={Ionicons}
    />
  );
};

export default CustomHeaderButton;
