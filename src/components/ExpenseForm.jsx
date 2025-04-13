import { useState } from 'react';

const ExpenseForm = ({ onAddExpense }) => {
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');
  const [category, setCategory] = useState('food');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title || !amount || !date) {
      alert('Please fill in all fields');
      return;
    }

    const newExpense = {
      id: Date.now(),
      title,
      amount: parseFloat(amount),
      date: new Date(date),
      category
    };

    onAddExpense(newExpense);

    // Reset form
    setTitle('');
    setAmount('');
    setDate('');
    setCategory('food');
  };

  return (
    <form onSubmit={handleSubmit} className="expense-form">
      <h2>Add New Expense</h2>

      <div className="form-group">
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="e.g. Groceries"
        />
      </div>

      <div className="form-group">
        <label htmlFor="amount">Amount</label>
        <input
          type="number"
          id="amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="0.00"
          min="0.01"
          step="0.01"
        />
      </div>

      <div className="form-group">
        <label htmlFor="date">Date</label>
        <input
          type="date"
          id="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label htmlFor="category">Category</label>
        <select
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="food">Food</option>
          <option value="transport">Transport</option>
          <option value="housing">Housing</option>
          <option value="entertainment">Entertainment</option>
          <option value="shopping">Shopping</option>
          <option value="other">Other</option>
        </select>
      </div>

      <button type="submit" className="submit-btn">Add Expense</button>
    </form>
  );
};

export default ExpenseForm;