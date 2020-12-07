import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { useDispatch, useSelector } from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { Ionicons, FontAwesome5, AntDesign } from "@expo/vector-icons";
import { NavigationContainer } from "@react-navigation/native";
import * as ScreenOrientation from "expo-screen-orientation";

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
import CompanyDetailsScreen from "../screens/SelectedWatch/CompanyDetailsScreen";
import BuySellScreen from "../screens/SelectedWatch/BuySellScreen";
import SignoutScreen from "../screens/Authentication/SignoutScreen";
import LoginScreen from "../screens/Authentication/LoginScreen";
import * as authActions from "../store/action/auth";
import SearchWindow from "../screens/More/SearchWindow";

const changeScreenOrientationToPortrait = async () => {
  await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.DEFAULT);
};

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
        name={"SearchStackNavigator"}
        component={SearchStackNavigator}
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
        options={{ tabBarLabel: "Trade Summary" }}
      />
      <MarketSummaryTab.Screen
        name="IndicesSummaryScreen"
        component={IndicesSummaryScreen}
        options={{ tabBarLabel: "Indices Summary" }}
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
      screenOptions={
        {
          // headerStyle: { backgroundColor: Colors.primary },
          // headerTintColor: "white",
        }
      }
    >
      <TopStocksTab.Screen
        name="GainersScreen"
        component={GainersScreen}
        options={{ tabBarLabel: "Gainers" }}
      />
      <TopStocksTab.Screen
        name="LosersScreen"
        component={LosersScreen}
        options={{ tabBarLabel: "Losers" }}
      />
      <TopStocksTab.Screen
        name="TurnOverScreen"
        component={TurnOverScreen}
        options={{ tabBarLabel: "Turn Over" }}
      />
      <TopStocksTab.Screen
        name="ShareVolumeScreen"
        component={ShareVolumeScreen}
        options={{ tabBarLabel: "Share Volume" }}
      />
    </TopStocksTab.Navigator>
  );
};

const TopStocksStack = createStackNavigator();

const TopStocksStackNavigator = (props) => {
  return (
    <TopStocksStack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primary },
        headerTintColor: Colors.white,
      }}
    >
      <TopStocksStack.Screen
        name="TopStocksTabNavigator"
        component={TopStocksTabNavigator}
        listeners={(props) => ({
          focus: () => changeScreenOrientationToPortrait(),
        })}
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
          headerRight: () => {
            return (
              <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item
                  iconName="ios-search"
                  onPress={() => {
                    props.navigation.navigate("SearchStackNavigator");
                  }}
                />
              </HeaderButtons>
            );
          },
        })}
      />
      <TopStocksStack.Screen
        name={"SearchStackNavigator"}
        component={SearchStackNavigator}
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
      <OrderListStack.Screen
        name={"SearchStackNavigator"}
        component={SearchStackNavigator}
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
      <PortfolioSummaryStack.Screen
        name={"SearchStackNavigator"}
        component={SearchStackNavigator}
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
      />
      <SelectWatchStack.Screen
        name="CompanyDetailsScreen"
        component={CompanyDetailsScreen}
      />
      <SelectWatchStack.Screen name="SearchWindow" component={SearchWindow} />
      <SelectWatchStack.Screen
        name="BuySellScreen"
        component={BuySellScreen}
        options={{ headerTitle: "Trading Screen" }}
      />
      <SelectWatchStack.Screen
        name={"SearchStackNavigator"}
        component={SearchStackNavigator}
      />
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
      <AccountSummaryStack.Screen
        name={"SearchStackNavigator"}
        component={SearchStackNavigator}
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

const SearchStack = createStackNavigator();

const SearchStackNavigator = () => {
  return (
    <SearchStack.Navigator>
      <SearchStack.Screen name={"SearchWindow"} component={SearchWindow} />
      <SearchStack.Screen
        name={"CompanyDetailsScreen"}
        component={CompanyDetailsScreen}
      />
      <SearchStack.Screen name={"BuySellScreen"} component={BuySellScreen} />
    </SearchStack.Navigator>
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
  const dispatch = useDispatch();

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
        listeners={() => ({
          focus: () => changeScreenOrientationToPortrait(),
        })}
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
        listeners={() => ({
          focus: () => changeScreenOrientationToPortrait(),
        })}
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
        listeners={() => ({
          focus: () => changeScreenOrientationToPortrait(),
        })}
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
        listeners={() => ({
          focus: () => changeScreenOrientationToPortrait(),
        })}
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
        listeners={() => ({
          focus: () => changeScreenOrientationToPortrait(),
        })}
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
        listeners={() => ({
          focus: () => changeScreenOrientationToPortrait(),
        })}
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
        listeners={() => ({
          focus: () => changeScreenOrientationToPortrait(),
        })}
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
        listeners={() => ({
          focus: () => changeScreenOrientationToPortrait(),
        })}
      />
      <DefaultDrawer.Screen
        name="SignoutScreen"
        component={SignoutScreen}
        listeners={{ focus: () => dispatch(authActions.signOut()) }}
        options={{ drawerLabel: "Sign Out" }}
      />
    </DefaultDrawer.Navigator>
  );
};
const LoginStack = createStackNavigator();

const LoginStackNavigator = () => {
  return (
    <LoginStack.Navigator>
      <LoginStack.Screen
        name={"LoginScreen"}
        component={LoginScreen}
        options={{
          headerTitle: "Login",
          headerTintColor: "white",
          headerStyle: { backgroundColor: Colors.primary },
        }}
      />
    </LoginStack.Navigator>
  );
};

const AtradNavigator = () => {
  const userToken = useSelector((state) => state.auth.userToken);

  return (
    <NavigationContainer>
      {userToken == null ? <LoginStackNavigator /> : <DefaultDrawerNavigator />}
      {/* <DefaultDrawerNavigator /> */}
    </NavigationContainer>
  );
};

// export default DefaultDrawerNavigator;
export default AtradNavigator;
// export default SignoutScreen;

// export default BuySellScreen;
