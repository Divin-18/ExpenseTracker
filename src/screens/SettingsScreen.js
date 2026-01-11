import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Alert,
  Switch,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import { CustomInput, CustomButton } from '../components';
import { setMonthlyBudget, clearAllExpenses } from '../store/slices/expenseSlice';
import { COLORS, SHADOWS } from '../constants';
import { formatCurrency } from '../utils';

const SettingsScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { monthlyBudget, expenses, totalExpenses, totalIncome, balance } =
    useSelector((state) => state.expenses);

  const [budget, setBudget] = useState(monthlyBudget.toString());
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(true);

  const handleSaveBudget = () => {
    const budgetValue = parseFloat(budget) || 0;
    dispatch(setMonthlyBudget(budgetValue));
    Alert.alert('Success', 'Monthly budget updated successfully');
  };

  const handleClearData = () => {
    Alert.alert(
      'Clear All Data',
      'Are you sure you want to delete all transactions? This action cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete All',
          style: 'destructive',
          onPress: () => {
            dispatch(clearAllExpenses());
            Alert.alert('Success', 'All data has been cleared');
          },
        },
      ]
    );
  };

  const handleExportData = () => {
    Alert.alert('Export Data', `Total transactions: ${expenses.length}\n\nExport feature coming soon!`);
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.background} />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Settings</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Account Summary */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Account Summary</Text>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Total Transactions</Text>
            <Text style={styles.summaryValue}>{expenses.length}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Total Income</Text>
            <Text style={[styles.summaryValue, { color: COLORS.success }]}>
              {formatCurrency(totalIncome)}
            </Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Total Expenses</Text>
            <Text style={[styles.summaryValue, { color: COLORS.danger }]}>
              {formatCurrency(totalExpenses)}
            </Text>
          </View>
          <View style={[styles.summaryRow, styles.summaryRowLast]}>
            <Text style={styles.summaryLabel}>Current Balance</Text>
            <Text
              style={[
                styles.summaryValue,
                { color: balance >= 0 ? COLORS.success : COLORS.danger },
              ]}
            >
              {formatCurrency(balance)}
            </Text>
          </View>
        </View>

        {/* Budget Settings */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Budget Settings</Text>
          <CustomInput
            label="Monthly Budget"
            value={budget}
            onChangeText={setBudget}
            placeholder="0.00"
            keyboardType="decimal-pad"
            prefix="$"
          />
          <CustomButton
            title="Save Budget"
            onPress={handleSaveBudget}
            variant="primary"
          />
        </View>

        {/* Preferences */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Preferences</Text>

          <View style={styles.preferenceRow}>
            <View style={styles.preferenceInfo}>
              <Text style={styles.preferenceIcon}>🔔</Text>
              <View>
                <Text style={styles.preferenceLabel}>Notifications</Text>
                <Text style={styles.preferenceDesc}>
                  Receive budget alerts
                </Text>
              </View>
            </View>
            <Switch
              value={notifications}
              onValueChange={setNotifications}
              trackColor={{ false: COLORS.border, true: COLORS.primary }}
              thumbColor={COLORS.textPrimary}
            />
          </View>

          <View style={styles.preferenceRow}>
            <View style={styles.preferenceInfo}>
              <Text style={styles.preferenceIcon}>🌙</Text>
              <View>
                <Text style={styles.preferenceLabel}>Dark Mode</Text>
                <Text style={styles.preferenceDesc}>
                  Enable dark theme
                </Text>
              </View>
            </View>
            <Switch
              value={darkMode}
              onValueChange={setDarkMode}
              trackColor={{ false: COLORS.border, true: COLORS.primary }}
              thumbColor={COLORS.textPrimary}
            />
          </View>
        </View>

        {/* Data Management */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Data Management</Text>

          <TouchableOpacity
            style={styles.menuItem}
            onPress={handleExportData}
          >
            <Text style={styles.menuIcon}>📤</Text>
            <View style={styles.menuInfo}>
              <Text style={styles.menuLabel}>Export Data</Text>
              <Text style={styles.menuDesc}>Download your transactions</Text>
            </View>
            <Text style={styles.menuArrow}>→</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.menuItem, styles.menuItemDanger]}
            onPress={handleClearData}
          >
            <Text style={styles.menuIcon}>🗑️</Text>
            <View style={styles.menuInfo}>
              <Text style={[styles.menuLabel, { color: COLORS.danger }]}>
                Clear All Data
              </Text>
              <Text style={styles.menuDesc}>
                Delete all transactions
              </Text>
            </View>
            <Text style={[styles.menuArrow, { color: COLORS.danger }]}>→</Text>
          </TouchableOpacity>
        </View>

        {/* App Info */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>About</Text>
          <View style={styles.aboutRow}>
            <Text style={styles.aboutLabel}>Version</Text>
            <Text style={styles.aboutValue}>1.0.0</Text>
          </View>
          <View style={styles.aboutRow}>
            <Text style={styles.aboutLabel}>Developer</Text>
            <Text style={styles.aboutValue}>Expense Tracker Team</Text>
          </View>
        </View>

        <View style={styles.bottomSpacing} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: COLORS.backgroundCard,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backIcon: {
    fontSize: 24,
    color: COLORS.textPrimary,
    fontWeight: '300',
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
  placeholder: {
    width: 44,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  card: {
    backgroundColor: COLORS.backgroundCard,
    borderRadius: 20,
    padding: 20,
    marginBottom: 16,
    ...SHADOWS.small,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginBottom: 16,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  summaryRowLast: {
    borderBottomWidth: 0,
  },
  summaryLabel: {
    fontSize: 14,
    color: COLORS.textSecondary,
    fontWeight: '500',
  },
  summaryValue: {
    fontSize: 15,
    color: COLORS.textPrimary,
    fontWeight: '600',
  },
  preferenceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  preferenceInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  preferenceIcon: {
    fontSize: 20,
    marginRight: 14,
  },
  preferenceLabel: {
    fontSize: 15,
    color: COLORS.textPrimary,
    fontWeight: '600',
    marginBottom: 2,
  },
  preferenceDesc: {
    fontSize: 12,
    color: COLORS.textMuted,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  menuItemDanger: {
    borderBottomWidth: 0,
  },
  menuIcon: {
    fontSize: 20,
    marginRight: 14,
  },
  menuInfo: {
    flex: 1,
  },
  menuLabel: {
    fontSize: 15,
    color: COLORS.textPrimary,
    fontWeight: '600',
    marginBottom: 2,
  },
  menuDesc: {
    fontSize: 12,
    color: COLORS.textMuted,
  },
  menuArrow: {
    fontSize: 18,
    color: COLORS.textMuted,
    fontWeight: '300',
  },
  aboutRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
  },
  aboutLabel: {
    fontSize: 14,
    color: COLORS.textSecondary,
  },
  aboutValue: {
    fontSize: 14,
    color: COLORS.textPrimary,
    fontWeight: '500',
  },
  bottomSpacing: {
    height: 20,
  },
});

export default SettingsScreen;
