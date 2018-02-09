import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import 'normalize.css/normalize.css'
import './styles/styles.scss';
import 'react-dates/lib/css/_datepicker.css';
import AppRouter from './routers/AppRouter.js';
import configureStore from './store/configure-store';
import { addExpense, removeExpense, editExpense} from './actions/expenses';
import { setTextFilter, sortByDate, sortByAmount, setStartDate, setEndDate } from './actions/filters';
import getVisibleExpenses from './selectors/expenses';

// set the store to the default from ./store/configure-store
const store = configureStore();

// add some expenses
store.dispatch(addExpense({ description: 'Water bill', amount: 4000 }));
store.dispatch(addExpense({ description: 'Gas bill', amount: 5000, createdAt: 100000000 }));
store.dispatch(addExpense({ description: 'Rent', amount: 80000 }));

// filter only ones with 'bill'
//store.dispatch(setTextFilter('bill'));

// setTimeout(() => {
//     store.dispatch(setTextFilter('rent'));
// }, 3000);

// display the filtered results
const state = store.getState();
console.log(getVisibleExpenses(state.expenses, state.filters));

const jsx = (
    <Provider store={store}>
        <AppRouter />
    </Provider>
);

ReactDOM.render(jsx, document.getElementById('app'));