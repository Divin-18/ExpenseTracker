import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { LinearGradient } from 'expo-linear-gradient';
import {
  HomeScreen,
  TransactionsScreen,
  AddExpenseScreen,
  ExpenseDetailsScreen,
  StatsScreen,
  SettingsScreen,
} from '../screens';
import { COLORS, GRADIENTS } from '../constants';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const TabIcon = ({ icon, focused, label }) => (
  <View style={styles.tabItem}>
    <Text style={[styles.tabIcon, focused && styles.tabIconActive]}>{icon}</Text>
    <Text style={[styles.tabLabel, focused && styles.tabLabelActive]}>
      {label}
    </Text>
  </View>
);

const HomeStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="HomeMain" component={HomeScreen} />
    <Stack.Screen name="ExpenseDetails" component={ExpenseDetailsScreen} />
    <Stack.Screen name="AddExpense" component={AddExpenseScreen} />
    <Stack.Screen name="Settings" component={SettingsScreen} />
  </Stack.Navigator>
);

const TransactionsStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="TransactionsMain" component={TransactionsScreen} />
    <Stack.Screen name="ExpenseDetails" component={ExpenseDetailsScreen} />
    <Stack.Screen name="AddExpense" component={AddExpenseScreen} />
  </Stack.Navigator>
);

const StatsStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="StatsMain" component={StatsScreen} />
  </Stack.Navigator>
);

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarStyle: styles.tabBar,
          tabBarShowLabel: false,
        }}
      >
        <Tab.Screen
          name="Home"
          component={HomeStack}
          options={{
            tabBarIcon: ({ focused }) => (
              <TabIcon icon="🏠" focused={focused} label="Home" />
            ),
          }}
        />
        <Tab.Screen
          name="Transactions"
          component={TransactionsStack}
          options={{
            tabBarIcon: ({ focused }) => (
              <TabIcon icon="📋" focused={focused} label="History" />
            ),
          }}
        />
        <Tab.Screen
          name="Stats"
          component={StatsStack}
          options={{
            tabBarIcon: ({ focused }) => (
              <TabIcon icon="📊" focused={focused} label="Stats" />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: COLORS.backgroundCard,
    borderTopWidth: 0,
    paddingTop: 10,
    paddingBottom: 20,
    height: 80,
    elevation: 10,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  tabItem: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabIcon: {
    fontSize: 24,
    marginBottom: 4,
    opacity: 0.5,
  },
  tabIconActive: {
    opacity: 1,
  },
  tabLabel: {
    fontSize: 11,
    fontWeight: '500',
    color: COLORS.textMuted,
  },
  tabLabelActive: {
    color: COLORS.primary,
    fontWeight: '600',
  },
});

export default AppNavigator;
