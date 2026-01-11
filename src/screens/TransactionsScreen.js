import React, { useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector, useDispatch } from 'react-redux';
import { ExpenseItem, EmptyState } from '../components';
import { COLORS, CATEGORIES } from '../constants';
import { setFilterCategory } from '../store/slices/uiSlice';
import { formatDate } from '../utils';

const TransactionsScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { expenses } = useSelector((state) => state.expenses);
  const { filterCategory } = useSelector((state) => state.ui);

  const filteredExpenses = useMemo(() => {
    if (filterCategory === 'all') return expenses;
    return expenses.filter((e) => e.category === filterCategory);
  }, [expenses, filterCategory]);

  // Group expenses by date
  const groupedExpenses = useMemo(() => {
    const groups = {};
    filteredExpenses.forEach((expense) => {
      const date = formatDate(expense.createdAt);
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(expense);
    });
    return Object.entries(groups).map(([date, items]) => ({
      title: date,
      data: items,
    }));
  }, [filteredExpenses]);

  const handleExpensePress = (expense) => {
    navigation.navigate('ExpenseDetails', { expense });
  };

  const handleFilterChange = (categoryId) => {
    dispatch(setFilterCategory(categoryId));
  };

  const renderExpenseItem = ({ item }) => (
    <ExpenseItem expense={item} onPress={handleExpensePress} />
  );

  const renderSectionHeader = (title) => (
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionTitle}>{title}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.background} />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Transactions</Text>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => navigation.navigate('AddExpense')}
        >
          <Text style={styles.addIcon}>+</Text>
        </TouchableOpacity>
      </View>

      {/* Category Filter */}
      <View style={styles.filterContainer}>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={[{ id: 'all', name: 'All', icon: '📊' }, ...CATEGORIES]}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.filterList}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[
                styles.filterChip,
                filterCategory === item.id && styles.filterChipActive,
              ]}
              onPress={() => handleFilterChange(item.id)}
            >
              <Text style={styles.filterIcon}>{item.icon}</Text>
              <Text
                style={[
                  styles.filterText,
                  filterCategory === item.id && styles.filterTextActive,
                ]}
              >
                {item.name}
              </Text>
            </TouchableOpacity>
          )}
        />
      </View>

      {/* Transactions List */}
      {groupedExpenses.length > 0 ? (
        <FlatList
          data={groupedExpenses}
          keyExtractor={(item) => item.title}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
          renderItem={({ item }) => (
            <View>
              {renderSectionHeader(item.title)}
              {item.data.map((expense) => (
                <ExpenseItem
                  key={expense.id}
                  expense={expense}
                  onPress={handleExpensePress}
                />
              ))}
            </View>
          )}
        />
      ) : (
        <EmptyState
          icon="🔍"
          title="No Transactions Found"
          message={
            filterCategory === 'all'
              ? 'Start adding expenses to see them here'
              : 'No transactions in this category'
          }
        />
      )}
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
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
  addButton: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addIcon: {
    fontSize: 24,
    fontWeight: '300',
    color: COLORS.textPrimary,
  },
  filterContainer: {
    marginBottom: 16,
  },
  filterList: {
    paddingHorizontal: 16,
  },
  filterChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.backgroundCard,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 12,
    marginRight: 10,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  filterChipActive: {
    backgroundColor: COLORS.primary + '20',
    borderColor: COLORS.primary,
  },
  filterIcon: {
    fontSize: 16,
    marginRight: 6,
  },
  filterText: {
    fontSize: 13,
    fontWeight: '500',
    color: COLORS.textSecondary,
  },
  filterTextActive: {
    color: COLORS.primary,
    fontWeight: '600',
  },
  listContent: {
    paddingBottom: 20,
  },
  sectionHeader: {
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.textMuted,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
});

export default TransactionsScreen;
