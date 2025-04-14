import { useState } from 'react';
import ExpenseForm from './components/ExpenseForm';
import './App.css';

function App() {
  const [expenses, setExpenses] = useState([]);

  const handleAddExpense = (newExpense) => {
    setExpenses(prevExpenses => [...prevExpenses, newExpense]);
  };

  return (
    <div className="app">
      <h1>Expense Tracker</h1>
      <ExpenseForm onAddExpense={handleAddExpense} />

      <div className="expenses-list">
        <h2>Your Expenses</h2>
        {expenses.length === 0 ? (
          <p className="no-expenses">No expenses added yet</p>
        ) : (
          <ul>
            {expenses.map(expense => (
              <li key={expense.id}>
                <div>
                  <span className="expense-title">{expense.title}</span>
                  <span className="expense-category">{expense.category}</span>
                </div>
                <div>
                  <span className="expense-amount">${expense.amount.toFixed(2)}</span>
                  <span className="expense-date">
                    {expense.date.toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric'
                    })}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default App;