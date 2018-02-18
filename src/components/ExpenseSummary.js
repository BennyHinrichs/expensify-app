import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import selectExpenses from '../selectors/expenses';
import selectExpensesTotal from '../selectors/expenses-total';

export const ExpenseSummary = (props) => {
    const expenseCount = props.expenses.length;
    const expensesTotal = selectExpensesTotal(props.expenses);

    // expenseText merely accounts for whether it should say '1 expense' or 'n expenses'
    const expenseText = expenseCount === 1 ? 'expense' : 'expenses';

    return (
        <div className="page-header">
            <div className="content-container">
                <h1 className="page-header__title page-header__title--summary">
                    Viewing <span>{expenseCount}</span> {expenseText} totalling <span>${(expensesTotal / 100).toFixed(2)}</span>
                </h1>
                <div className="page-header__actions">
                    <Link className="button" to="/create">Add Expense</Link>
                </div>
            </div>
        </div>
    );
}

// have to use selectExpenses same as ExpenseList to get the proper length (and ergo total)
const mapStateToProps = (state) => ({ expenses: selectExpenses(state.expenses, state.filters )});

export default connect(mapStateToProps)(ExpenseSummary);