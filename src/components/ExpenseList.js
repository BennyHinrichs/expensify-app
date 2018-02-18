import React from 'react';
import { connect } from 'react-redux';
import ExpenseListItem from './ExpenseListItem';
import selectExpenses from '../selectors/expenses';

export const ExpenseList = (props) => (
    <div className="content-container">
        <div className="list-header">
            <div className="show-for-mobile">Expenses</div>
            <div className="show-for-large">Expense</div>
            <div className="show-for-large">Amount</div>
        </div>
        <div className="list-body">
            {props.expenses.length === 0 && 
                <span className="list-item list-item--message">
                    No expenses logged
                </span>
            }
            {
                props.expenses.map((expense) => (
                    <ExpenseListItem
                        {...expense}
                        key={expense.id}
                    />
                ))
            }
        </div>
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