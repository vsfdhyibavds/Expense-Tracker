// src/store/useExpenseStore.js
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useExpenseStore = create(
  persist(
    (set, get) => ({
      expenses: [],
      addExpense: (expense) => set((state) => ({
        expenses: [...state.expenses, {
          ...expense,
          id: Date.now(),
          date: new Date(expense.date)
        }]
      })),
      editExpense: (id, updatedExpense) => set((state) => ({
        expenses: state.expenses.map(exp =>
          exp.id === id ? { ...updatedExpense, id } : exp
        )
      })),
      deleteExpense: (id) => set((state) => ({
        expenses: state.expenses.filter(exp => exp.id !== id)
      })),
      getExpensesByCategory: (category) => {
        return get().expenses.filter(exp => exp.category === category);
      },
      getTotalExpenses: () => {
        return get().expenses.reduce((sum, exp) => sum + exp.amount, 0);
      },
      getExpensesByDateRange: (startDate, endDate) => {
        return get().expenses.filter(exp => {
          const expDate = new Date(exp.date);
          return expDate >= startDate && expDate <= endDate;
        });
      }
    }),
    {
      name: 'expense-storage', // localStorage key
    }
  )
);