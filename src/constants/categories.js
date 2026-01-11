import { COLORS } from './colors';

export const CATEGORIES = [
  {
    id: 'food',
    name: 'Food & Dining',
    icon: '🍔',
    color: COLORS.food,
  },
  {
    id: 'transport',
    name: 'Transportation',
    icon: '🚗',
    color: COLORS.transport,
  },
  {
    id: 'shopping',
    name: 'Shopping',
    icon: '🛍️',
    color: COLORS.shopping,
  },
  {
    id: 'entertainment',
    name: 'Entertainment',
    icon: '🎬',
    color: COLORS.entertainment,
  },
  {
    id: 'bills',
    name: 'Bills & Utilities',
    icon: '📄',
    color: COLORS.bills,
  },
  {
    id: 'health',
    name: 'Health',
    icon: '💊',
    color: COLORS.health,
  },
  {
    id: 'education',
    name: 'Education',
    icon: '📚',
    color: COLORS.education,
  },
  {
    id: 'others',
    name: 'Others',
    icon: '📦',
    color: COLORS.others,
  },
];

export const getCategoryById = (id) => {
  return CATEGORIES.find((cat) => cat.id === id) || CATEGORIES[CATEGORIES.length - 1];
};

export const getCategoryColor = (id) => {
  const category = getCategoryById(id);
  return category.color;
};

export default CATEGORIES;
