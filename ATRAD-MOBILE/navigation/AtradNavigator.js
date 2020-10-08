import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { Ionicons, FontAwesome5, AntDesign } from "@expo/vector-icons";

import HeaderButton from "../components/ATComponents/HeaderButton";
import AnnouncementsScreen from "../screens/MarketInfo/AnnouncementsScreen";
import BrokerScreen from "../screens/MarketInfo/BrokerScreen";
import CSEScreen from "../screens/MarketInfo/CSEScreen";
import GainersScreen from "../screens/MarketInfo/GainersScreen";
import IndicesSummaryScreen from "../screens/MarketInfo/IndicesSummaryScreen";
import LosersScreen from "../screens/MarketInfo/LosersScreen";
import MarketInfoScreen from "../screens/MarketInfo/MarketInfoScreen";
import ShareVolumeScreen from "../screens/MarketInfo/ShareVolumeScreen";
import TradeSummaryScreen from "../screens/MarketInfo/TradeSummaryScreen";
import TurnOverScreen from "../screens/MarketInfo/TurnOverScreen";
import OrderListScreen from "../screens/OrderList/OrderListScreen";
import PortfolioSummaryScreen from "../screens/PortfolioSummary/PortfolioSummaryScreen";
import SelectedWatchScreen from "../screens/SelectedWatch/SelectedWatchScreen";
import AccountSummaryScreen from "../screens/More/AccountSummaryScreen";
import ChartScreen from "../screens/More/ChartScreen";
import SettingsScreen from "../screens/More/SettingsScreen";
import WatchListScreen from "../screens/SelectedWatch/WatchListScreen";
import Colors from "../constants/Colors";
import CompnayDetailsScreen from "../screens/SelectedWatch/CompanyDetailsScreen";
import CompanyDetailsScreen from "../screens/SelectedWatch/CompanyDetailsScreen";
import BuyScreen from "../screens/SelectedWatch/BuyScreen";
import SellScreen from "../screens/SelectedWatch/SellScreen";

const MarketInfoStack = createStackNavigator();

const MarketInfoStackNavigator = (props) => {
  return (
    <MarketInfoStack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primary },
        headerTintColor: "white",
      }}
    >
      <MarketInfoStack.Screen
        name="MarketInfoScreen"
        component={MarketInfoScreen}
        options={(props) => ({
          headerLeft: () => {
            return (
              <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item
                  iconName="ios-menu"
                  onPress={() => {
                    props.navigation.toggleDrawer();
                  }}
                />
              </HeaderButtons>
            );
          },
          headerTitle: "Market Info",
        })}
      />
      <MarketInfoStack.Screen
        name="AnnouncementsScreen"
        component={AnnouncementsScreen}
      />
      <MarketInfoStack.Screen name="BrokerScreen" component={BrokerScreen} />
      <MarketInfoStack.Screen name="CSEScreen" component={CSEScreen} />
      <MarketInfoStack.Screen
        name="MarketSummaryStackNavigator"
        component={MarketSummaryStackNavigator}
      />
      <MarketInfoStack.Screen
        name="TopStocksStackNavigator"
        component={TopStocksStackNavigator}
      />
    </MarketInfoStack.Navigator>
  );
};

const MarketSummaryTab = createMaterialTopTabNavigator();

const MarketSummaryTabNavigator = () => {
  return (
    <MarketSummaryTab.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primary },
        headerTintColor: "white",
      }}
    >
      <MarketSummaryTab.Screen
        name="TradeSummaryScreen"
        component={TradeSummaryScreen}
      />
      <MarketSummaryTab.Screen
        name="IndicesSummaryScreen"
        component={IndicesSummaryScreen}
      />
    </MarketSummaryTab.Navigator>
  );
};

const MarketSummaryStack = createStackNavigator();

const MarketSummaryStackNavigator = () => {
  return (
    <MarketSummaryStack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primary },
        headerTintColor: "white",
      }}
    >
      <MarketSummaryStack.Screen
        name="MarketSummaryTabNavigator"
        component={MarketSummaryTabNavigator}
      />
    </MarketSummaryStack.Navigator>
  );
};

const TopStocksTab = createMaterialTopTabNavigator();

const TopStocksTabNavigator = () => {
  return (
    <TopStocksTab.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primary },
        headerTintColor: "white",
      }}
    >
      <TopStocksTab.Screen name="GainersScreen" component={GainersScreen} />
      <TopStocksTab.Screen name="LosersScreen" component={LosersScreen} />
      <TopStocksTab.Screen name="TurnOverScreen" component={TurnOverScreen} />
      <TopStocksTab.Screen
        name="ShareVolumeScreen"
        component={ShareVolumeScreen}
      />
    </TopStocksTab.Navigator>
  );
};

const TopStocksStack = createStackNavigator();

const TopStocksStackNavigator = () => {
  return (
    <TopStocksStack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primary },
        headerTintColor: "white",
      }}
    >
      <TopStocksStack.Screen
        name="TopStocksTabNavigator"
        component={TopStocksTabNavigator}
        options={(props) => ({
          headerLeft: () => {
            return (
              <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item
                  iconName="ios-menu"
                  onPress={() => {
                    props.navigation.toggleDrawer();
                  }}
                />
              </HeaderButtons>
            );
          },
        })}
      />
    </TopStocksStack.Navigator>
  );
};

const OrderListStack = createStackNavigator();

const OrderListStackNavigator = () => {
  return (
    <OrderListStack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primary },
        headerTintColor: "white",
      }}
    >
      <OrderListStack.Screen
        name="OrderListScreen"
        component={OrderListScreen}
        options={(props) => ({
          headerLeft: () => {
            return (
              <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item
                  iconName="ios-menu"
                  onPress={() => {
                    props.navigation.toggleDrawer();
                  }}
                />
              </HeaderButtons>
            );
          },
        })}
      />
    </OrderListStack.Navigator>
  );
};

const PortfolioSummaryStack = createStackNavigator();

const PortfolioSummaryStackNavigator = () => {
  return (
    <PortfolioSummaryStack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primary },
        headerTintColor: "white",
      }}
    >
      <PortfolioSummaryStack.Screen
        name="PortfolioSummaryScreen"
        component={PortfolioSummaryScreen}
        options={(props) => ({
          headerLeft: () => {
            return (
              <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item
                  iconName="ios-menu"
                  onPress={() => {
                    props.navigation.toggleDrawer();
                  }}
                />
              </HeaderButtons>
            );
          },
        })}
      />
    </PortfolioSummaryStack.Navigator>
  );
};

const SelectWatchStack = createStackNavigator();

const SelectWatchStackNavigator = () => {
  return (
    <SelectWatchStack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primary },
        headerTintColor: "white",
      }}
    >
      <SelectWatchStack.Screen
        name="SelectedWatchScreen"
        component={SelectedWatchScreen}
        options={(props) => ({
          headerLeft: () => {
            return (
              <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item
                  iconName="ios-menu"
                  onPress={() => {
                    props.navigation.toggleDrawer();
                  }}
                />
              </HeaderButtons>
            );
          },
        })}
      />
      <SelectWatchStack.Screen
        name="WatchListScreen"
        component={WatchListScreen}
        options={{}}
      />
      <SelectWatchStack.Screen
        name="CompanyDetailsScreen"
        component={CompanyDetailsScreen}
      />
      <SelectWatchStack.Screen name="BuyScreen" component={BuyScreen} />
      <SelectWatchStack.Screen name="SellScreen" component={SellScreen} />
    </SelectWatchStack.Navigator>
  );
};

const AccountSummaryStack = createStackNavigator();

const AccountSummaryStackNavigator = () => {
  return (
    <AccountSummaryStack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primary },
        headerTintColor: "white",
      }}
    >
      <AccountSummaryStack.Screen
        name="AccountSummaryScreen"
        component={AccountSummaryScreen}
        options={(props) => ({
          headerLeft: () => {
            return (
              <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item
                  iconName="ios-menu"
                  onPress={() => {
                    props.navigation.toggleDrawer();
                  }}
                />
              </HeaderButtons>
            );
          },
        })}
      />
    </AccountSummaryStack.Navigator>
  );
};

const ChartStack = createStackNavigator();

const ChartStackNavigator = () => {
  return (
    <ChartStack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primary },
        headerTintColor: "white",
      }}
    >
      <ChartStack.Screen
        name="ChartScreen"
        component={ChartScreen}
        options={(props) => ({
          headerLeft: () => {
            return (
              <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item
                  iconName="ios-menu"
                  onPress={() => {
                    props.navigation.toggleDrawer();
                  }}
                />
              </HeaderButtons>
            );
          },
        })}
      />
    </ChartStack.Navigator>
  );
};

const SettingsStack = createStackNavigator();

const SettingsStackNavigator = () => {
  return (
    <SettingsStack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primary },
        headerTintColor: "white",
      }}
    >
      <SettingsStack.Screen
        name="SettingsScreen"
        component={SettingsScreen}
        options={(props) => ({
          headerLeft: () => {
            return (
              <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item
                  iconName="ios-menu"
                  onPress={() => {
                    props.navigation.toggleDrawer();
                  }}
                />
              </HeaderButtons>
            );
          },
        })}
      />
    </SettingsStack.Navigator>
  );
};

const DefaultTab = createBottomTabNavigator();

const DefaultTabNavigator = (props) => {
  return (
    <DefaultTab.Navigator
      initialRouteName={props.route.params.routeScreen}
      tabBarOptions={{ activeTintColor: Colors.primary }}
    >
      <DefaultTab.Screen
        name="MarketInfoStackNavigator"
        component={MarketInfoStackNavigator}
        options={{
          tabBarIcon: (tabInfo) => {
            return (
              <Ionicons name="ios-contact" size={23} color={tabInfo.color} />
            );
          },
          tabBarLabel: "Market Info",
        }}
        listeners={(props) => ({
          tabPress: (e) => {
            e.preventDefault();
            props.navigation.jumpTo("MarketInfo");
          },
        })}
      />
      <DefaultTab.Screen
        name="OrderListStackNavigator"
        component={OrderListStackNavigator}
        options={{
          tabBarIcon: (tabInfo) => {
            return <Ionicons name="ios-list" size={23} color={tabInfo.color} />;
          },
          tabBarLabel: "Order List",
        }}
        listeners={(props) => ({
          tabPress: (e) => {
            e.preventDefault();
            props.navigation.jumpTo("OrderList");
          },
        })}
      />
      <DefaultTab.Screen
        name="PortfolioSummaryStackNavigator"
        component={PortfolioSummaryStackNavigator}
        options={{
          tabBarIcon: (tabInfo) => {
            return (
              <Ionicons name="ios-briefcase" size={23} color={tabInfo.color} />
            );
          },
          tabBarLabel: "Portfolio Summary",
        }}
        listeners={(props) => ({
          tabPress: (e) => {
            e.preventDefault();
            props.navigation.jumpTo("PortfolioSummary");
          },
        })}
      />
      <DefaultTab.Screen
        name="SelectWatchStackNavigator"
        component={SelectWatchStackNavigator}
        options={{
          tabBarIcon: (tabInfo) => {
            return (
              <FontAwesome5 name="chart-line" size={23} color={tabInfo.color} />
            );
          },
          tabBarLabel: "Selected Watch",
        }}
        listeners={(props) => ({
          tabPress: (e) => {
            e.preventDefault();
            props.navigation.jumpTo("SelectedWatch");
          },
        })}
      />
    </DefaultTab.Navigator>
  );
};

const DefaultDrawer = createDrawerNavigator();

const DefaultDrawerNavigator = () => {
  return (
    <DefaultDrawer.Navigator
      initialRouteName="SelectedWatch"
      drawerContentOptions={{
        activeTintColor: Colors.primary,
      }}
    >
      <DefaultDrawer.Screen
        initialParams={{ routeScreen: "MarketInfoStackNavigator" }}
        name="MarketInfo"
        component={DefaultTabNavigator}
        // listeners = {}
        options={{
          drawerIcon: (drawerInfo) => {
            return (
              <Ionicons name="ios-contact" size={23} color={drawerInfo.color} />
            );
          },
          drawerLabel: "Market Info",
          unmountOnBlur: true,
        }}
      />
      <DefaultDrawer.Screen
        initialParams={{ routeScreen: "OrderListStackNavigator" }}
        name="OrderList"
        component={DefaultTabNavigator}
        options={{
          drawerIcon: (drawerInfo) => {
            return (
              <FontAwesome5
                name="chart-line"
                size={23}
                color={drawerInfo.color}
              />
            );
          },
          drawerLabel: "Order List",
          unmountOnBlur: true,
        }}
      />
      <DefaultDrawer.Screen
        initialParams={{ routeScreen: "PortfolioSummaryStackNavigator" }}
        name="PortfolioSummary"
        component={DefaultTabNavigator}
        options={{
          drawerIcon: (drawerInfo) => {
            return (
              <Ionicons
                name="ios-briefcase"
                size={23}
                color={drawerInfo.color}
              />
            );
          },
          drawerLabel: "Portfolio Summary",
          unmountOnBlur: true,
        }}
      />
      <DefaultDrawer.Screen
        initialParams={{ routeScreen: "SelectWatchStackNavigator" }}
        name="SelectedWatch"
        component={DefaultTabNavigator}
        options={{
          drawerIcon: (drawerInfo) => {
            return (
              <Ionicons name="ios-list" size={23} color={drawerInfo.color} />
            );
          },
          drawerLabel: "Selected Watch",
          unmountOnBlur: true,
        }}
      />
      <DefaultDrawer.Screen
        name="TopStocksStackNavigator"
        component={TopStocksStackNavigator}
        options={{
          drawerIcon: (drawerInfo) => {
            return (
              <AntDesign name="totop" size={23} color={drawerInfo.color} />
            );
          },
          drawerLabel: "Top Stocks",
          unmountOnBlur: true,
        }}
      />
      <DefaultDrawer.Screen
        name="AccountSummaryStackNavigator"
        component={AccountSummaryStackNavigator}
        options={{
          drawerIcon: (drawerInfo) => {
            return (
              <Ionicons name="ios-wallet" size={23} color={drawerInfo.color} />
            );
          },
          drawerLabel: "Account Summary",
          unmountOnBlur: true,
        }}
      />
      <DefaultDrawer.Screen
        name="ChartStackNavigator"
        component={ChartStackNavigator}
        options={{
          drawerIcon: (drawerInfo) => {
            return (
              <FontAwesome5
                name="chart-area"
                size={23}
                color={drawerInfo.color}
              />
            );
          },
          drawerLabel: "Charts",
        }}
      />
      <DefaultDrawer.Screen
        name="SettingsStackNavigator"
        component={SettingsStackNavigator}
        options={{
          drawerIcon: (drawerInfo) => {
            return (
              <Ionicons
                name="ios-settings"
                size={23}
                color={drawerInfo.color}
              />
            );
          },
          drawerLabel: "Settings",
        }}
      />
    </DefaultDrawer.Navigator>
  );
};

// const LoginStack = createStackNavigator();

// const LoginStackNavigator = () => {

// }

export default DefaultDrawerNavigator;

// export default BuyScreen;
