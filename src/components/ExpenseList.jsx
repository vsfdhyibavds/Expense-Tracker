// src/components/ExpenseList.jsx
import { useExpenseStore } from '../store/useExpenseStore';
import { useState } from 'react';

const ExpenseList = () => {
  const { expenses, deleteExpense } = useExpenseStore();
  const [sortBy, setSortBy] = useState('date-desc');
  const [filterCategory, setFilterCategory] = useState('all');

  // Get unique categories for filter
  const categories = ['all', ...new Set(expenses.map(exp => exp.category))];

  // Process expenses based on filters/sorting
  const processedExpenses = expenses
    .filter(exp => filterCategory === 'all' || exp.category === filterCategory)
    .sort((a, b) => {
      if (sortBy === 'date-desc') return new Date(b.date) - new Date(a.date);
      if (sortBy === 'date-asc') return new Date(a.date) - new Date(b.date);
      if (sortBy === 'amount-desc') return b.amount - a.amount;
      return a.amount - b.amount;
    });

  return (
    <div className="expenses-list">
      <div className="list-controls">
        <div className="filter-control">
          <label>Filter by:</label>
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
          >
            {categories.map(cat => (
              <option key={cat} value={cat}>
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </option>
            ))}
          </select>
        </div>

        <div className="sort-control">
          <label>Sort by:</label>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="date-desc">Date (Newest)</option>
            <option value="date-asc">Date (Oldest)</option>
            <option value="amount-desc">Amount (High)</option>
            <option value="amount-asc">Amount (Low)</option>
          </select>
        </div>
      </div>

      {processedExpenses.length === 0 ? (
        <p className="no-expenses">No expenses found</p>
      ) : (
        <ul>
          {processedExpenses.map(expense => (
            <li key={expense.id}>
              <div className="expense-info">
                <span className="expense-title">{expense.title}</span>
                <span className={`expense-category ${expense.category}`}>
                  {expense.category}
                </span>
              </div>
              <div className="expense-meta">
                <span className="expense-amount">
                  ${expense.amount.toFixed(2)}
                </span>
                <span className="expense-date">
                  {new Date(expense.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric'
                  })}
                </span>
                <button
                  onClick={() => deleteExpense(expense.id)}
                  className="delete-btn"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ExpenseList;