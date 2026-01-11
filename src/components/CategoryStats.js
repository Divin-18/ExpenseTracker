import React from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import { COLORS, SHADOWS, CATEGORIES, getCategoryById } from '../constants';
import { formatCurrency, getPercentage } from '../utils';

const CategoryStats = ({ categoryTotals, totalExpenses }) => {
  const sortedCategories = Object.entries(categoryTotals)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5);

  if (sortedCategories.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No expense data yet</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {sortedCategories.map(([categoryId, amount]) => {
        const category = getCategoryById(categoryId);
        const percentage = getPercentage(amount, totalExpenses);

        return (
          <View key={categoryId} style={styles.categoryRow}>
            <View style={styles.categoryInfo}>
              <View
                style={[
                  styles.iconContainer,
                  { backgroundColor: category.color + '20' },
                ]}
              >
                <Text style={styles.icon}>{category.icon}</Text>
              </View>
              <View style={styles.textContainer}>
                <Text style={styles.categoryName}>{category.name}</Text>
                <Text style={styles.categoryAmount}>
                  {formatCurrency(amount)}
                </Text>
              </View>
            </View>

            <View style={styles.progressContainer}>
              <View style={styles.progressBar}>
                <View
                  style={[
                    styles.progressFill,
                    {
                      width: `${percentage}%`,
                      backgroundColor: category.color,
                    },
                  ]}
                />
              </View>
              <Text style={styles.percentage}>{percentage}%</Text>
            </View>
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.backgroundCard,
    borderRadius: 20,
    padding: 20,
    marginHorizontal: 16,
    marginBottom: 16,
    ...SHADOWS.small,
  },
  emptyContainer: {
    backgroundColor: COLORS.backgroundCard,
    borderRadius: 20,
    padding: 30,
    marginHorizontal: 16,
    marginBottom: 16,
    alignItems: 'center',
    ...SHADOWS.small,
  },
  emptyText: {
    color: COLORS.textMuted,
    fontSize: 14,
  },
  categoryRow: {
    marginBottom: 16,
  },
  categoryInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  icon: {
    fontSize: 20,
  },
  textContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  categoryName: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.textPrimary,
  },
  categoryAmount: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.textSecondary,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  progressBar: {
    flex: 1,
    height: 6,
    backgroundColor: COLORS.backgroundLight,
    borderRadius: 3,
    overflow: 'hidden',
    marginRight: 12,
  },
  progressFill: {
    height: '100%',
    borderRadius: 3,
  },
  percentage: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.textMuted,
    width: 35,
    textAlign: 'right',
  },
});

export default CategoryStats;
