// src/store/useExpenseStore.js
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const USERS_KEY = 'users-storage';

const getUsersFromStorage = () => {
  const users = localStorage.getItem(USERS_KEY);
  return users ? JSON.parse(users) : {};
};

const saveUsersToStorage = (users) => {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
};

export const useExpenseStore = create(
  persist(
    (set, get) => ({
      user: null, // { username }
      expenses: [],
      users: getUsersFromStorage(),

      login: (username, password) => {
        const users = getUsersFromStorage();
        if (users[username] && users[username].password === password) {
          set({ user: { username }, expenses: users[username].expenses || [] });
          return true;
        }
        return false;
      },

      register: (username, password) => {
        const users = getUsersFromStorage();
        if (users[username]) {
          return false; // user exists
        }
        users[username] = { password, expenses: [] };
        saveUsersToStorage(users);
        set({ user: { username }, expenses: [] });
        return true;
      },

      logout: () => {
        const { user, expenses, users } = get();
        if (user) {
          users[user.username].expenses = expenses;
          saveUsersToStorage(users);
        }
        set({ user: null, expenses: [] });
      },

      addExpense: (expense) => set((state) => {
        if (!state.user) return state;
        const newExpense = {
          ...expense,
          id: Date.now(),
          date: new Date(expense.date)
        };
        const updatedExpenses = [...state.expenses, newExpense];
        const users = getUsersFromStorage();
        users[state.user.username].expenses = updatedExpenses;
        saveUsersToStorage(users);
        return { expenses: updatedExpenses };
      }),

      editExpense: (id, updatedExpense) => set((state) => {
        if (!state.user) return state;
        const updatedExpenses = state.expenses.map(exp =>
          exp.id === id ? { ...updatedExpense, id } : exp
        );
        const users = getUsersFromStorage();
        users[state.user.username].expenses = updatedExpenses;
        saveUsersToStorage(users);
        return { expenses: updatedExpenses };
      }),

      deleteExpense: (id) => set((state) => {
        if (!state.user) return state;
        const updatedExpenses = state.expenses.filter(exp => exp.id !== id);
        const users = getUsersFromStorage();
        users[state.user.username].expenses = updatedExpenses;
        saveUsersToStorage(users);
        return { expenses: updatedExpenses };
      }),

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
      name: 'expense-storage', // localStorage key for current session user expenses
    }
  )
);
