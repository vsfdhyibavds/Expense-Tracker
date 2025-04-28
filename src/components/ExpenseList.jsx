import { useExpenseStore } from '../store/useExpenseStore';
import { useState } from 'react';

const ExpenseList = () => {
  const { expenses, deleteExpense } = useExpenseStore();
  const [sortBy, setSortBy] = useState('date-desc');
  const [filterCategory, setFilterCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Get unique categories for filter
  const categories = ['all', ...new Set(expenses.map(exp => exp.category))];

  // Process expenses based on filters/sorting
  const processedExpenses = expenses
    .filter(exp => {
      const matchesCategory = filterCategory === 'all' || exp.category === filterCategory;
      const matchesSearch = exp.title.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    })
    .sort((a, b) => {
      if (sortBy === 'date-desc') return new Date(b.date) - new Date(a.date);
      if (sortBy === 'date-asc') return new Date(a.date) - new Date(b.date);
      if (sortBy === 'amount-desc') return b.amount - a.amount;
      if (sortBy === 'amount-asc') return a.amount - b.amount;
      if (sortBy === 'category-asc') return a.category.localeCompare(b.category);
      if (sortBy === 'category-desc') return b.category.localeCompare(a.category);
      if (sortBy === 'title-asc') return a.title.localeCompare(b.title);
      if (sortBy === 'title-desc') return b.title.localeCompare(a.title);
      return 0;
    });

  return (
    <div className="expenses-list">
      <div className="list-controls">
        <div className="search-control">
          <label>Search:</label>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by description..."
          />
        </div>
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
            <option value="category-asc">Category (A-Z)</option>
            <option value="category-desc">Category (Z-A)</option>
            <option value="title-asc">Description (A-Z)</option>
            <option value="title-desc">Description (Z-A)</option>
          </select>
        </div>
      </div>

      {processedExpenses.length === 0 ? (
        <p className="no-expenses">No expenses found</p>
      ) : (
        <table className="expense-table">
          <thead>
            <tr>
              <th>Description</th>
              <th>Category</th>
              <th>Amount</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {processedExpenses.map(expense => (
              <tr key={expense.id}>
                <td>{expense.title}</td>
                <td>{expense.category}</td>
                <td>${expense.amount.toFixed(2)}</td>
                <td>{new Date(expense.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric'
                })}</td>
                <td>
                  <button
                    onClick={() => deleteExpense(expense.id)}
                    className="delete-btn"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ExpenseList;
