// src/components/ExpenseChart.jsx
import { useExpenseStore } from '../store/useExpenseStore';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale,
  LinearScale, BarElement, Title } from 'chart.js';
import { Pie, Bar } from 'react-chartjs-2';

ChartJS.register(
  ArcElement, Tooltip, Legend, CategoryScale,
  LinearScale, BarElement, Title
);

const ExpenseChart = () => {
  const expenses = useExpenseStore(state => state.expenses);

  // Prepare data for charts
  const categories = [...new Set(expenses.map(exp => exp.category))];

  // Category spending data
  const categoryData = categories.map(cat => ({
    category: cat,
    total: expenses
      .filter(exp => exp.category === cat)
      .reduce((sum, exp) => sum + exp.amount, 0)
  }));

  // Weekly spending data (last 4 weeks)
  const weeklyData = Array.from({ length: 4 }, (_, i) => {
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(endDate.getDate() - 7 * (i + 1));
    endDate.setDate(endDate.getDate() - 7 * i);

    return {
      week: `Week ${4 - i}`,
      total: expenses
        .filter(exp => {
          const expDate = new Date(exp.date);
          return expDate >= startDate && expDate <= endDate;
        })
        .reduce((sum, exp) => sum + exp.amount, 0)
    };
  }).reverse();

  return (
    <div className="expense-charts">
      <div className="chart-container">
        <h3>Spending by Category</h3>
        <Pie
          data={{
            labels: categoryData.map(item => item.category),
            datasets: [{
              data: categoryData.map(item => item.total),
              backgroundColor: [
                '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0',
                '#9966FF', '#FF9F40', '#8AC24A'
              ],
              borderWidth: 1
            }]
          }}
        />
      </div>

      <div className="chart-container">
        <h3>Weekly Spending</h3>
        <Bar
          data={{
            labels: weeklyData.map(item => item.week),
            datasets: [{
              label: 'Total Spending',
              data: weeklyData.map(item => item.total),
              backgroundColor: '#4CAF50',
              borderWidth: 1
            }]
          }}
          options={{
            scales: {
              y: {
                beginAtZero: true
              }
            }
          }}
        />
      </div>
    </div>
  );
};

export default ExpenseChart;