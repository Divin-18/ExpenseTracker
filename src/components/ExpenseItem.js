import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { COLORS, SHADOWS, getCategoryById } from '../constants';
import { formatCurrency, formatDate, getRelativeDate } from '../utils';

const ExpenseItem = ({ expense, onPress, onLongPress }) => {
  const category = getCategoryById(expense.category);
  const isExpense = expense.type === 'expense';

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => onPress && onPress(expense)}
      onLongPress={() => onLongPress && onLongPress(expense)}
      activeOpacity={0.7}
    >
      <View style={[styles.iconContainer, { backgroundColor: category.color + '20' }]}>
        <Text style={styles.icon}>{category.icon}</Text>
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.title} numberOfLines={1}>
          {expense.title}
        </Text>
        <View style={styles.metaContainer}>
          <Text style={styles.category}>{category.name}</Text>
          <Text style={styles.dot}>•</Text>
          <Text style={styles.date}>{getRelativeDate(expense.createdAt)}</Text>
        </View>
      </View>

      <View style={styles.amountContainer}>
        <Text
          style={[
            styles.amount,
            { color: isExpense ? COLORS.danger : COLORS.success },
          ]}
        >
          {isExpense ? '-' : '+'}
          {formatCurrency(expense.amount)}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.backgroundCard,
    borderRadius: 16,
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 12,
    ...SHADOWS.small,
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  icon: {
    fontSize: 24,
  },
  infoContainer: {
    flex: 1,
    marginRight: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.textPrimary,
    marginBottom: 6,
  },
  metaContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  category: {
    fontSize: 12,
    color: COLORS.textSecondary,
    fontWeight: '500',
  },
  dot: {
    fontSize: 12,
    color: COLORS.textMuted,
    marginHorizontal: 6,
  },
  date: {
    fontSize: 12,
    color: COLORS.textMuted,
  },
  amountContainer: {
    alignItems: 'flex-end',
  },
  amount: {
    fontSize: 16,
    fontWeight: '700',
  },
});

export default ExpenseItem;
