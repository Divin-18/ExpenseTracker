import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch } from 'react-redux';
import {
  CategoryPicker,
  CustomInput,
  CustomButton,
  TypeSelector,
} from '../components';
import { addExpense } from '../store/slices/expenseSlice';
import { COLORS } from '../constants';

const AddExpenseScreen = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const editExpense = route.params?.expense;

  const [title, setTitle] = useState(editExpense?.title || '');
  const [amount, setAmount] = useState(editExpense?.amount?.toString() || '');
  const [category, setCategory] = useState(editExpense?.category || 'food');
  const [type, setType] = useState(editExpense?.type || 'expense');
  const [description, setDescription] = useState(editExpense?.description || '');
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!title.trim()) {
      newErrors.title = 'Title is required';
    }
    if (!amount || parseFloat(amount) <= 0) {
      newErrors.amount = 'Please enter a valid amount';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (!validate()) return;

    const expenseData = {
      title: title.trim(),
      amount: parseFloat(amount),
      category,
      type,
      description: description.trim(),
    };

    dispatch(addExpense(expenseData));

    Alert.alert(
      'Success! 🎉',
      `${type === 'expense' ? 'Expense' : 'Income'} added successfully`,
      [
        {
          text: 'OK',
          onPress: () => navigation.goBack(),
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
        <Text style={styles.title}>
          {editExpense ? 'Edit Transaction' : 'Add Transaction'}
        </Text>
        <View style={styles.placeholder} />
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* Type Selector */}
          <TypeSelector selectedType={type} onSelectType={setType} />

          {/* Amount Input */}
          <CustomInput
            label="Amount"
            value={amount}
            onChangeText={setAmount}
            placeholder="0.00"
            keyboardType="decimal-pad"
            prefix="$"
            error={errors.amount}
          />

          {/* Title Input */}
          <CustomInput
            label="Title"
            value={title}
            onChangeText={setTitle}
            placeholder="e.g., Grocery shopping"
            error={errors.title}
          />

          {/* Category Picker */}
          <CategoryPicker
            selectedCategory={category}
            onSelectCategory={setCategory}
          />

          {/* Description Input */}
          <CustomInput
            label="Description (Optional)"
            value={description}
            onChangeText={setDescription}
            placeholder="Add a note..."
            multiline
            numberOfLines={3}
          />

          {/* Save Button */}
          <View style={styles.buttonContainer}>
            <CustomButton
              title={editExpense ? 'Update Transaction' : 'Add Transaction'}
              onPress={handleSave}
              size="large"
              variant={type === 'expense' ? 'danger' : 'success'}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
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
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 40,
  },
  buttonContainer: {
    marginTop: 20,
  },
});

export default AddExpenseScreen;
