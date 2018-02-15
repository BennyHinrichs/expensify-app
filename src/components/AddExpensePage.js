import React from 'react';
import ExpenseForm from './ExpenseForm';
import { connect } from 'react-redux';
import { startAddExpense } from '../actions/expenses';

export class AddExpensePage extends React.Component {
    onSubmit = (expense) => {
        this.props.startAddExpense(expense);
        this.props.history.push('/'); // redirect to dashboard
    };

    render() {
        return (
            <div>
                <h1>Add Expense</h1>
                <ExpenseForm 
                    path={this.props.location.pathname}
                    onSubmit={this.onSubmit}
                />
            </div>
        );
    };
}

const mapDispatchToProps = (dispatch) => ({ startAddExpense: (expense) => dispatch(startAddExpense(expense)) });

// mapDispatchToProps is the second argument of connect. if mapStateToProps is empty, must be undefined.
export default connect(undefined, mapDispatchToProps)(AddExpensePage);