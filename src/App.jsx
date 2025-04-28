import { useExpenseStore } from './store/useExpenseStore';
import ExpenseForm from './components/ExpenseForm';
import ExpenseTable from './components/ExpenseTable';
import './App.css';
import './index.css';

function App() {
  const { expenses, addExpense, deleteExpense } = useExpenseStore();

  const handleAddExpense = (newExpense) => {
    addExpense(newExpense);
  };

  const setExpenses = (newExpenses) => {
    // Determine which expenses were removed and call deleteExpense for each
    const removedExpenses = expenses.filter(exp => !newExpenses.some(ne => ne.id === exp.id));
    removedExpenses.forEach(exp => deleteExpense(exp.id));
  };

  return (
    <div className="app">
      <h1>Expense Tracker</h1>
      <ExpenseForm onAddExpense={handleAddExpense} />
      <ExpenseTable expenses={expenses} setExpenses={setExpenses} />
    </div>
  );
}

export default App;
