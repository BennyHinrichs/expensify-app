import React from 'react';
import { connect } from 'react-redux';
import selectExpenses from '../selectors/expenses';
import selectExpensesTotal from '../selectors/expenses-total';

export const ExpenseSummary = (props) => {
    const expenseCount = props.expenses.length;
    const expensesTotal = selectExpensesTotal(props.expenses);

    // expenseText merely accounts for whether it should say '1 expense' or 'n expenses'
    const expenseText = expenseCount === 1 ? 'expense' : 'expenses';

    return (
        <div>
            <p>Viewing {expenseCount} {expenseText} totalling ${(expensesTotal / 100).toFixed(2)}</p>;
        </div>
    );
}

// have to use selectExpenses same as ExpenseList to get the proper length (and ergo total)
const mapStateToProps = (state) => ({ expenses: selectExpenses(state.expenses, state.filters )});

export default connect(mapStateToProps)(ExpenseSummary);