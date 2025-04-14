import { useExpenseStore } from './store/useExpenseStore';
import ExpenseForm from './components/ExpenseForm';
import ExpenseList from './components/ExpenseList';
import './App.css';
import './index.css';

function App() {
  const { addExpense } = useExpenseStore();

  const handleAddExpense = (newExpense) => {
    addExpense(newExpense);
  };

  return (
    <div className="app">
      <h1>Expense Tracker</h1>
      <ExpenseForm onAddExpense={handleAddExpense} />
      <ExpenseList />
    </div>
  );
}

export default App;