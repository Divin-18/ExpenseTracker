import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { COLORS, CATEGORIES } from '../constants';

const CategoryPicker = ({ selectedCategory, onSelectCategory }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Select Category</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
      >
        {CATEGORIES.map((category) => (
          <TouchableOpacity
            key={category.id}
            style={[
              styles.categoryItem,
              selectedCategory === category.id && styles.categoryItemSelected,
              { borderColor: category.color },
            ]}
            onPress={() => onSelectCategory(category.id)}
            activeOpacity={0.7}
          >
            <View
              style={[
                styles.iconContainer,
                {
                  backgroundColor:
                    selectedCategory === category.id
                      ? category.color
                      : category.color + '20',
                },
              ]}
            >
              <Text style={styles.icon}>{category.icon}</Text>
            </View>
            <Text
              style={[
                styles.categoryName,
                selectedCategory === category.id && styles.categoryNameSelected,
              ]}
              numberOfLines={1}
            >
              {category.name}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
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
  scrollContainer: {
    paddingHorizontal: 4,
  },
  categoryItem: {
    alignItems: 'center',
    backgroundColor: COLORS.backgroundCard,
    borderRadius: 16,
    padding: 12,
    marginRight: 12,
    minWidth: 90,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  categoryItemSelected: {
    backgroundColor: COLORS.backgroundLight,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  icon: {
    fontSize: 24,
  },
  categoryName: {
    fontSize: 11,
    color: COLORS.textSecondary,
    fontWeight: '500',
    textAlign: 'center',
  },
  categoryNameSelected: {
    color: COLORS.textPrimary,
    fontWeight: '600',
  },
});

export default CategoryPicker;
