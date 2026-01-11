import React, { useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import { LinearGradient } from 'expo-linear-gradient';
import { CategoryStats, EmptyState } from '../components';
import { COLORS, GRADIENTS, SHADOWS, getCategoryById, CATEGORIES } from '../constants';
import {
  formatCurrency,
  calculateCategoryTotals,
  getPercentage,
  isThisMonth,
  isThisWeek,
} from '../utils';

const { width } = Dimensions.get('window');

const StatsScreen = () => {
  const { expenses, totalExpenses, totalIncome, balance } = useSelector(
    (state) => state.expenses
  );

  const categoryTotals = useMemo(() => {
    return calculateCategoryTotals(expenses);
  }, [expenses]);

  const thisWeekExpenses = useMemo(() => {
    return expenses
      .filter((e) => e.type === 'expense' && isThisWeek(e.createdAt))
      .reduce((sum, e) => sum + e.amount, 0);
  }, [expenses]);

  const thisMonthExpenses = useMemo(() => {
    return expenses
      .filter((e) => e.type === 'expense' && isThisMonth(e.createdAt))
      .reduce((sum, e) => sum + e.amount, 0);
  }, [expenses]);

  const topCategory = useMemo(() => {
    const entries = Object.entries(categoryTotals);
    if (entries.length === 0) return null;
    const [categoryId, amount] = entries.sort(([, a], [, b]) => b - a)[0];
    return { ...getCategoryById(categoryId), amount };
  }, [categoryTotals]);

  if (expenses.length === 0) {
    return (
      <SafeAreaView style={styles.container} edges={['top']}>
        <StatusBar barStyle="light-content" backgroundColor={COLORS.background} />
        <View style={styles.header}>
          <Text style={styles.title}>Statistics</Text>
        </View>
        <EmptyState
          icon="📈"
          title="No Data Yet"
          message="Start adding transactions to see your spending statistics"
        />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.background} />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Statistics</Text>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Summary Cards */}
        <View style={styles.summaryContainer}>
          <LinearGradient
            colors={GRADIENTS.income}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.summaryCard}
          >
            <Text style={styles.summaryLabel}>Total Income</Text>
            <Text style={styles.summaryAmount}>{formatCurrency(totalIncome)}</Text>
          </LinearGradient>

          <LinearGradient
            colors={GRADIENTS.expense}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.summaryCard}
          >
            <Text style={styles.summaryLabel}>Total Expenses</Text>
            <Text style={styles.summaryAmount}>{formatCurrency(totalExpenses)}</Text>
          </LinearGradient>
        </View>

        {/* Quick Stats */}
        <View style={styles.quickStats}>
          <View style={styles.quickStatCard}>
            <Text style={styles.quickStatIcon}>📅</Text>
            <Text style={styles.quickStatLabel}>This Week</Text>
            <Text style={styles.quickStatAmount}>
              {formatCurrency(thisWeekExpenses)}
            </Text>
          </View>

          <View style={styles.quickStatCard}>
            <Text style={styles.quickStatIcon}>📆</Text>
            <Text style={styles.quickStatLabel}>This Month</Text>
            <Text style={styles.quickStatAmount}>
              {formatCurrency(thisMonthExpenses)}
            </Text>
          </View>

          <View style={styles.quickStatCard}>
            <Text style={styles.quickStatIcon}>💰</Text>
            <Text style={styles.quickStatLabel}>Balance</Text>
            <Text
              style={[
                styles.quickStatAmount,
                { color: balance >= 0 ? COLORS.success : COLORS.danger },
              ]}
            >
              {formatCurrency(balance)}
            </Text>
          </View>
        </View>

        {/* Top Category */}
        {topCategory && (
          <View style={styles.topCategoryCard}>
            <View style={styles.topCategoryHeader}>
              <Text style={styles.sectionTitle}>Top Spending Category</Text>
            </View>
            <View style={styles.topCategoryContent}>
              <View
                style={[
                  styles.topCategoryIcon,
                  { backgroundColor: topCategory.color + '20' },
                ]}
              >
                <Text style={styles.topCategoryEmoji}>{topCategory.icon}</Text>
              </View>
              <View style={styles.topCategoryInfo}>
                <Text style={styles.topCategoryName}>{topCategory.name}</Text>
                <Text style={styles.topCategoryAmount}>
                  {formatCurrency(topCategory.amount)}
                </Text>
              </View>
              <View style={styles.topCategoryPercentage}>
                <Text style={styles.percentageText}>
                  {getPercentage(topCategory.amount, totalExpenses)}%
                </Text>
              </View>
            </View>
          </View>
        )}

        {/* Category Breakdown */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Spending Breakdown</Text>
          <CategoryStats
            categoryTotals={categoryTotals}
            totalExpenses={totalExpenses}
          />
        </View>

        {/* Transaction Count */}
        <View style={styles.countCard}>
          <View style={styles.countItem}>
            <Text style={styles.countNumber}>{expenses.length}</Text>
            <Text style={styles.countLabel}>Total Transactions</Text>
          </View>
          <View style={styles.countDivider} />
          <View style={styles.countItem}>
            <Text style={styles.countNumber}>
              {expenses.filter((e) => e.type === 'expense').length}
            </Text>
            <Text style={styles.countLabel}>Expenses</Text>
          </View>
          <View style={styles.countDivider} />
          <View style={styles.countItem}>
            <Text style={styles.countNumber}>
              {expenses.filter((e) => e.type === 'income').length}
            </Text>
            <Text style={styles.countLabel}>Income</Text>
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
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  summaryContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  summaryCard: {
    flex: 1,
    borderRadius: 16,
    padding: 20,
    marginHorizontal: 4,
    ...SHADOWS.medium,
  },
  summaryLabel: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.8)',
    fontWeight: '500',
    marginBottom: 8,
  },
  summaryAmount: {
    fontSize: 22,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
  quickStats: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    marginBottom: 20,
  },
  quickStatCard: {
    flex: 1,
    backgroundColor: COLORS.backgroundCard,
    borderRadius: 16,
    padding: 16,
    marginHorizontal: 4,
    alignItems: 'center',
    ...SHADOWS.small,
  },
  quickStatIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  quickStatLabel: {
    fontSize: 11,
    color: COLORS.textMuted,
    fontWeight: '500',
    marginBottom: 6,
  },
  quickStatAmount: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
  section: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.textPrimary,
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  topCategoryCard: {
    backgroundColor: COLORS.backgroundCard,
    borderRadius: 20,
    padding: 20,
    marginHorizontal: 16,
    marginBottom: 20,
    ...SHADOWS.small,
  },
  topCategoryHeader: {
    marginBottom: 16,
  },
  topCategoryContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  topCategoryIcon: {
    width: 56,
    height: 56,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  topCategoryEmoji: {
    fontSize: 28,
  },
  topCategoryInfo: {
    flex: 1,
  },
  topCategoryName: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.textPrimary,
    marginBottom: 4,
  },
  topCategoryAmount: {
    fontSize: 14,
    color: COLORS.textSecondary,
    fontWeight: '500',
  },
  topCategoryPercentage: {
    backgroundColor: COLORS.primary + '20',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 10,
  },
  percentageText: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.primary,
  },
  countCard: {
    flexDirection: 'row',
    backgroundColor: COLORS.backgroundCard,
    borderRadius: 20,
    padding: 24,
    marginHorizontal: 16,
    ...SHADOWS.small,
  },
  countItem: {
    flex: 1,
    alignItems: 'center',
  },
  countNumber: {
    fontSize: 28,
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginBottom: 4,
  },
  countLabel: {
    fontSize: 12,
    color: COLORS.textMuted,
    fontWeight: '500',
  },
  countDivider: {
    width: 1,
    backgroundColor: COLORS.border,
    marginHorizontal: 8,
  },
  bottomSpacing: {
    height: 20,
  },
});

export default StatsScreen;
