export const formatCurrency = (amount, currency = 'USD') => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
};

export const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

export const formatTime = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  });
};

export const formatDateTime = (dateString) => {
  return `${formatDate(dateString)} at ${formatTime(dateString)}`;
};

export const getRelativeDate = (dateString) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffTime = now - date;
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return 'Today';
  if (diffDays === 1) return 'Yesterday';
  if (diffDays < 7) return `${diffDays} days ago`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
  if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`;
  return `${Math.floor(diffDays / 365)} years ago`;
};

export const getMonthYear = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
  });
};

export const isToday = (dateString) => {
  const date = new Date(dateString);
  const today = new Date();
  return date.toDateString() === today.toDateString();
};

export const isThisWeek = (dateString) => {
  const date = new Date(dateString);
  const now = new Date();
  const startOfWeek = new Date(now.setDate(now.getDate() - now.getDay()));
  startOfWeek.setHours(0, 0, 0, 0);
  return date >= startOfWeek;
};

export const isThisMonth = (dateString) => {
  const date = new Date(dateString);
  const now = new Date();
  return (
    date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear()
  );
};

export const isThisYear = (dateString) => {
  const date = new Date(dateString);
  const now = new Date();
  return date.getFullYear() === now.getFullYear();
};

export const groupExpensesByDate = (expenses) => {
  const groups = {};
  expenses.forEach((expense) => {
    const date = formatDate(expense.createdAt);
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(expense);
  });
  return groups;
};

export const groupExpensesByCategory = (expenses) => {
  const groups = {};
  expenses.forEach((expense) => {
    const category = expense.category;
    if (!groups[category]) {
      groups[category] = [];
    }
    groups[category].push(expense);
  });
  return groups;
};

export const calculateCategoryTotals = (expenses) => {
  const totals = {};
  expenses
    .filter((e) => e.type === 'expense')
    .forEach((expense) => {
      if (!totals[expense.category]) {
        totals[expense.category] = 0;
      }
      totals[expense.category] += expense.amount;
    });
  return totals;
};

export const getPercentage = (part, total) => {
  if (total === 0) return 0;
  return Math.round((part / total) * 100);
};

export const generateId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};
