import { useExpenseStore } from './store/useExpenseStore';
import ExpenseForm from './components/ExpenseForm';
import ExpenseTable from './components/ExpenseTable';
import AuthForm from './components/AuthForm';
import './App.css';
import './index.css';

function App() {
  const { user, logout, expenses, addExpense, deleteExpense } = useExpenseStore();

  const handleAddExpense = (newExpense) => {
    addExpense(newExpense);
  };

  const setExpenses = (newExpenses) => {
    // Determine which expenses were removed and call deleteExpense for each
    const removedExpenses = expenses.filter(exp => !newExpenses.some(ne => ne.id === exp.id));
    removedExpenses.forEach(exp => deleteExpense(exp.id));
  };

  if (!user) {
    return (
      <div className="app">
        <h1>Expense Tracker - Please Log In</h1>
        <AuthForm />
      </div>
    );
  }

  return (
    <div className="app">
      <h1>Expense Tracker</h1>
      <button onClick={logout} style={{ float: 'right', margin: '10px' }}>
        Logout ({user.username})
      </button>
      <ExpenseForm onAddExpense={handleAddExpense} />
      <ExpenseTable expenses={expenses} setExpenses={setExpenses} />
    </div>
  );
}

export default App;
