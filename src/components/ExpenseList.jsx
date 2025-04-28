import { useExpenseStore } from '../store/useExpenseStore';
import { useState } from 'react';

const ExpenseList = () => {
  const { expenses, deleteExpense } = useExpenseStore();
  const [sortConfig, setSortConfig] = useState({ key: 'date', direction: 'desc' });
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
      if (sortConfig.key === 'date') {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        return sortConfig.direction === 'asc' ? dateA - dateB : dateB - dateA;
      }
      if (sortConfig.key === 'amount') {
        return sortConfig.direction === 'asc' ? a.amount - b.amount : b.amount - a.amount;
      }
      if (sortConfig.key === 'category') {
        return sortConfig.direction === 'asc'
          ? a.category.localeCompare(b.category)
          : b.category.localeCompare(a.category);
      }
      if (sortConfig.key === 'title') {
        return sortConfig.direction === 'asc'
          ? a.title.localeCompare(b.title)
          : b.title.localeCompare(a.title);
      }
      return 0;
    });

  const requestSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const getSortIndicator = (key) => {
    if (sortConfig.key === key) {
      return sortConfig.direction === 'asc' ? '↑' : '↓';
    }
    return '';
  };

  const totalAmount = processedExpenses.reduce((sum, exp) => sum + exp.amount, 0);

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
      </div>

      {processedExpenses.length === 0 ? (
        <p className="no-expenses">No expenses found</p>
      ) : (
        <>
          <table className="expense-table">
            <thead>
              <tr>
                <th onClick={() => requestSort('title')} style={{ cursor: 'pointer' }}>
                  Description {getSortIndicator('title')}
                </th>
                <th onClick={() => requestSort('category')} style={{ cursor: 'pointer' }}>
                  Category {getSortIndicator('category')}
                </th>
                <th onClick={() => requestSort('amount')} style={{ cursor: 'pointer' }}>
                  Amount {getSortIndicator('amount')}
                </th>
                <th onClick={() => requestSort('date')} style={{ cursor: 'pointer' }}>
                  Date {getSortIndicator('date')}
                </th>
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
          <div className="total-amount">
            <strong>Total Amount: </strong>${totalAmount.toFixed(2)}
          </div>
        </>
      )}
    </div>
  );
};

export default ExpenseList;
