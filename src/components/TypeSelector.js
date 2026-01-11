import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { COLORS } from '../constants';

const TypeSelector = ({ selectedType, onSelectType }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Transaction Type</Text>
      <View style={styles.selectorContainer}>
        <TouchableOpacity
          style={[
            styles.option,
            selectedType === 'expense' && styles.expenseOption,
          ]}
          onPress={() => onSelectType('expense')}
          activeOpacity={0.7}
        >
          <Text style={styles.optionIcon}>↓</Text>
          <Text
            style={[
              styles.optionText,
              selectedType === 'expense' && styles.activeText,
            ]}
          >
            Expense
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.option,
            selectedType === 'income' && styles.incomeOption,
          ]}
          onPress={() => onSelectType('income')}
          activeOpacity={0.7}
        >
          <Text style={styles.optionIcon}>↑</Text>
          <Text
            style={[
              styles.optionText,
              selectedType === 'income' && styles.activeText,
            ]}
          >
            Income
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.textSecondary,
    marginBottom: 12,
    marginLeft: 4,
  },
  selectorContainer: {
    flexDirection: 'row',
    backgroundColor: COLORS.backgroundCard,
    borderRadius: 14,
    padding: 6,
  },
  option: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 14,
    borderRadius: 10,
  },
  expenseOption: {
    backgroundColor: COLORS.danger + '30',
  },
  incomeOption: {
    backgroundColor: COLORS.success + '30',
  },
  optionIcon: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginRight: 8,
  },
  optionText: {
    fontSize: 15,
    fontWeight: '500',
    color: COLORS.textSecondary,
  },
  activeText: {
    color: COLORS.textPrimary,
    fontWeight: '600',
  },
});

export default TypeSelector;
