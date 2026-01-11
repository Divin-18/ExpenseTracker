import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, GRADIENTS, SHADOWS } from '../constants';
import { formatCurrency } from '../utils';

const { width } = Dimensions.get('window');

const BalanceCard = ({ balance, income, expenses, budget }) => {
  const budgetUsed = budget > 0 ? Math.min((expenses / budget) * 100, 100) : 0;

  return (
    <LinearGradient
      colors={GRADIENTS.header}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <View style={styles.glassOverlay}>
        <Text style={styles.balanceLabel}>Total Balance</Text>
        <Text style={styles.balanceAmount}>{formatCurrency(balance)}</Text>

        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <View style={[styles.statIcon, styles.incomeIcon]}>
              <Text style={styles.statIconText}>↑</Text>
            </View>
            <View style={styles.statInfo}>
              <Text style={styles.statLabel}>Income</Text>
              <Text style={styles.statAmount}>{formatCurrency(income)}</Text>
            </View>
          </View>

          <View style={styles.divider} />

          <View style={styles.statItem}>
            <View style={[styles.statIcon, styles.expenseIcon]}>
              <Text style={styles.statIconText}>↓</Text>
            </View>
            <View style={styles.statInfo}>
              <Text style={styles.statLabel}>Expenses</Text>
              <Text style={styles.statAmount}>{formatCurrency(expenses)}</Text>
            </View>
          </View>
        </View>

        {budget > 0 && (
          <View style={styles.budgetContainer}>
            <View style={styles.budgetHeader}>
              <Text style={styles.budgetLabel}>Monthly Budget</Text>
              <Text style={styles.budgetPercentage}>
                {budgetUsed.toFixed(0)}%
              </Text>
            </View>
            <View style={styles.progressBar}>
              <View
                style={[
                  styles.progressFill,
                  {
                    width: `${budgetUsed}%`,
                    backgroundColor:
                      budgetUsed > 80 ? COLORS.danger : COLORS.textPrimary,
                  },
                ]}
              />
            </View>
            <Text style={styles.budgetText}>
              {formatCurrency(expenses)} of {formatCurrency(budget)}
            </Text>
          </View>
        )}
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 24,
    marginHorizontal: 16,
    marginTop: 16,
    ...SHADOWS.large,
  },
  glassOverlay: {
    padding: 24,
    borderRadius: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  balanceLabel: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
    fontWeight: '500',
    textAlign: 'center',
    marginBottom: 8,
  },
  balanceAmount: {
    fontSize: 40,
    fontWeight: '700',
    color: COLORS.textPrimary,
    textAlign: 'center',
    letterSpacing: 1,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: 24,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.2)',
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  statIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  incomeIcon: {
    backgroundColor: 'rgba(0, 217, 165, 0.3)',
  },
  expenseIcon: {
    backgroundColor: 'rgba(255, 87, 87, 0.3)',
  },
  statIconText: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
  statInfo: {
    flex: 1,
  },
  statLabel: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.7)',
    fontWeight: '500',
    marginBottom: 4,
  },
  statAmount: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.textPrimary,
  },
  divider: {
    width: 1,
    height: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    marginHorizontal: 16,
  },
  budgetContainer: {
    marginTop: 20,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.2)',
  },
  budgetHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  budgetLabel: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.7)',
    fontWeight: '500',
  },
  budgetPercentage: {
    fontSize: 12,
    color: COLORS.textPrimary,
    fontWeight: '600',
  },
  progressBar: {
    height: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 4,
  },
  budgetText: {
    fontSize: 11,
    color: 'rgba(255, 255, 255, 0.7)',
    textAlign: 'center',
    marginTop: 8,
  },
});

export default BalanceCard;
