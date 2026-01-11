import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch } from 'react-redux';
import { LinearGradient } from 'expo-linear-gradient';
import { CustomButton } from '../components';
import { removeExpense } from '../store/slices/expenseSlice';
import { COLORS, GRADIENTS, SHADOWS, getCategoryById } from '../constants';
import { formatCurrency, formatDateTime } from '../utils';

const ExpenseDetailsScreen = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const { expense } = route.params;
  const category = getCategoryById(expense.category);
  const isExpense = expense.type === 'expense';

  const handleDelete = () => {
    Alert.alert(
      'Delete Transaction',
      'Are you sure you want to delete this transaction?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            dispatch(removeExpense(expense.id));
            navigation.goBack();
          },
        },
      ]
    );
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
        <Text style={styles.headerTitle}>Transaction Details</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Amount Card */}
        <LinearGradient
          colors={isExpense ? GRADIENTS.expense : GRADIENTS.income}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.amountCard}
        >
          <View style={styles.amountGlass}>
            <Text style={styles.amountLabel}>
              {isExpense ? 'Expense' : 'Income'}
            </Text>
            <Text style={styles.amount}>
              {isExpense ? '-' : '+'}
              {formatCurrency(expense.amount)}
            </Text>
          </View>
        </LinearGradient>

        {/* Details Card */}
        <View style={styles.detailsCard}>
          {/* Category */}
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Category</Text>
            <View style={styles.categoryBadge}>
              <View
                style={[
                  styles.categoryIcon,
                  { backgroundColor: category.color + '20' },
                ]}
              >
                <Text style={styles.icon}>{category.icon}</Text>
              </View>
              <Text style={styles.categoryName}>{category.name}</Text>
            </View>
          </View>

          <View style={styles.divider} />

          {/* Title */}
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Title</Text>
            <Text style={styles.detailValue}>{expense.title}</Text>
          </View>

          <View style={styles.divider} />

          {/* Date */}
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Date & Time</Text>
            <Text style={styles.detailValue}>
              {formatDateTime(expense.createdAt)}
            </Text>
          </View>

          {expense.description && (
            <>
              <View style={styles.divider} />
              <View style={styles.detailRowColumn}>
                <Text style={styles.detailLabel}>Description</Text>
                <Text style={styles.descriptionText}>{expense.description}</Text>
              </View>
            </>
          )}
        </View>

        {/* Action Buttons */}
        <View style={styles.actionsContainer}>
          <View style={styles.actionButton}>
            <CustomButton
              title="Delete Transaction"
              onPress={handleDelete}
              variant="danger"
              size="large"
            />
          </View>
        </View>
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
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
  placeholder: {
    width: 44,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  amountCard: {
    borderRadius: 24,
    marginBottom: 24,
    ...SHADOWS.large,
  },
  amountGlass: {
    padding: 32,
    borderRadius: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    alignItems: 'center',
  },
  amountLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: 'rgba(255, 255, 255, 0.8)',
    marginBottom: 8,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  amount: {
    fontSize: 42,
    fontWeight: '700',
    color: COLORS.textPrimary,
    letterSpacing: 1,
  },
  detailsCard: {
    backgroundColor: COLORS.backgroundCard,
    borderRadius: 20,
    padding: 24,
    ...SHADOWS.small,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  detailRowColumn: {
    flexDirection: 'column',
  },
  detailLabel: {
    fontSize: 14,
    color: COLORS.textMuted,
    fontWeight: '500',
  },
  detailValue: {
    fontSize: 15,
    color: COLORS.textPrimary,
    fontWeight: '600',
    textAlign: 'right',
    flex: 1,
    marginLeft: 16,
  },
  categoryBadge: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  categoryIcon: {
    width: 36,
    height: 36,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  icon: {
    fontSize: 18,
  },
  categoryName: {
    fontSize: 15,
    color: COLORS.textPrimary,
    fontWeight: '600',
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.border,
    marginVertical: 16,
  },
  descriptionText: {
    fontSize: 15,
    color: COLORS.textSecondary,
    lineHeight: 22,
    marginTop: 8,
  },
  actionsContainer: {
    marginTop: 24,
  },
  actionButton: {
    marginBottom: 12,
  },
});

export default ExpenseDetailsScreen;
