import React from 'react';
import { connect } from 'react-redux';
import ExpenseListItem from './ExpenseListItem';
import selectExpenses from '../selectors/expenses';

export const ExpenseList = (props) => (
    <div>
        <h1>Expense List</h1>
        {props.expenses.length === 0 && <p>No expenses logged.</p>}
        {
            props.expenses.map((expense) => (
                <ExpenseListItem
                    {...expense}
                    key={expense.id}
                />
            ))
        }
    </div>
);

const mapStateToProps = (state) => {
    return {
        expenses: selectExpenses(state.expenses, state.filters)
        // without the filter (obviously won't filter the object):
        // expenses: state.expenses,
        // filters: state.filters
    };
};

export default connect(mapStateToProps)(ExpenseList);