import React from 'react';
import { connect } from 'react-redux';
import ExpenseGraph from './ExpenseGraph';
import ExpenseListItem from './ExpenseListItem';
import selectExpenses from '../selectors/expenses';

export class ExpenseList extends React.Component {

    // There's probably a better way to keep it from scrolling to the top when you load the graph,
    // but this works for now. Maybe get the position of the updated component and scroll to its top.
    componentWillUpdate() {
        const base = document.documentElement;
        const prev = base.scrollTop;
        setTimeout(() => {
            base.scroll(0, prev);
        }, 10);
    }

    render() {
        const props = this.props;
        return (
            <div className="content-container" id="expense-list-container">
            {/* <ExpenseGraph {...props} className="list-body__graph" /> */}
                {props.filters.graphToggle ?
                    <div className="list-body__graph">
                        <ExpenseGraph {...props} />
                    </div> :
                    <div>
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
                            <div className="list-body__list">
                                {props.expenses.map((expense) => (
                                        <ExpenseListItem
                                            {...expense}
                                            key={expense.id}
                                        />
                                    ))
                                }
                            </div>
                        </div>
                    </div>
            }     
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        expenses: selectExpenses(state.expenses, state.filters),
        filters: state.filters
    };
};

export default connect(mapStateToProps)(ExpenseList);