# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript and enable type-aware lint rules. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

# Expense Tracker Application

A modern expense tracking application built with React and Vite, featuring state management with Zustand and data visualization.

## Features

- Add, view, and manage expenses
- Multiple view options (List, Table, Chart)
- Persistent storage using Zustand middleware
- Responsive design
- Data visualization with charts

## Technologies Used

- React 18
- Vite
- Zustand (State Management)
- React Icons (if used)
- Chart.js (if used for visualization)
- CSS Modules

## Installation

1. Clone the repository
```bash
git clone https://github.com/your-repo/expense-tracker.git
```

2. Install dependencies
```bash
npm install
```

3. Start the development server
```bash
npm run dev
```

## Usage

1. **Adding Expenses**:
   - Fill out the expense form with details
   - Click "Add Expense" to save

2. **Viewing Expenses**:
   - Switch between List, Table, and Chart views
   - Expenses are automatically saved and persisted

3. **Managing Expenses**:
   - Edit or delete existing expenses
   - View expense statistics in the chart view

## Project Structure

```
expense-tracker/
├── src/
│   ├── components/
│   │   ├── ExpenseForm.jsx   # Expense input form
│   │   ├── ExpenseList.jsx   # List view of expenses
│   │   ├── ExpenseTable.jsx  # Table view of expenses
│   │   └── ExpenseChart.jsx  # Visualization of expense data
│   ├── store/
│   │   └── useExpenseStore.js # Zustand store configuration
│   ├── App.jsx               # Main application component
│   └── main.jsx              # Application entry point
├── public/                   # Static assets
└── package.json              # Project configuration
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Deployment link:
https://expense-tracker-rho-mocha.vercel.app/