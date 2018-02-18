import React from 'react';
import { connect } from 'react-redux';
import ExpenseForm from './ExpenseForm';
import { startEditExpense, startRemoveExpense } from '../actions/expenses';
import { setTimeout } from 'timers';

export class EditExpensePage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            confirmMessage: ''
        }
    }

    onSubmit = (expense) => {
        this.props.startEditExpense(this.props.expense.id, expense);
        this.props.history.push('/');
    };

    onRemove = (e) => {
        e.preventDefault();
        if (!this.state.confirmMessage) {
            this.setState(() => ({ confirmMessage: 'Press delete again to confirm' }));
            setTimeout(() => this.setState(() => ({ confirmMessage: '' })), 3000);
            setTimeout(() => document.getElementById('message').style.color = 'white', 1);
        } else {
            this.props.startRemoveExpense({ id: this.props.expense.id });
            this.props.history.push('/');
            // this.setState(() => ({ confirmMessage: '' }));
        }
    };

    render() {
        return (
            <div>
                <div className="page-header">
                    <div className="content-container">
                        <h1 className="page-header__title">Edit Expense</h1>
                    </div>
                </div>
                <div className="content-container">
                    <ExpenseForm
                        expense={this.props.expense}
                        onSubmit={this.onSubmit}
                    />
                    <button 
                        className="button button--secondary"
                        id="button--secondary"
                        onClick={this.onRemove}
                    >Delete</button>
                    {this.state.confirmMessage && 
                        (<span className="button--secondary__message" id="message">
                            {this.state.confirmMessage} 
                        </span>
                        )
                    }
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state, props) => {
    return {
        expense: state.expenses.find((expense) => expense.id === props.match.params.id),
        //description: state.description.find((expense) => expense.id === props.match.params.id)
    };
};

const mapDispatchToProps = (dispatch, props) => {
    return {
        startEditExpense: (id, expense) => dispatch(startEditExpense(id, expense)),
        startRemoveExpense: (data) => dispatch(startRemoveExpense(data))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditExpensePage);