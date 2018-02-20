import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';

export default ({ id, description, amount, createdAt, note }) => (
    <Link className="list-item" to={`/edit/${id}`}>
        <div className="list-item__container">
            <div className="list-item__left">
                <h3 className="list-item__title">{description}</h3>
                <span className="list-item__sub-title">{moment(createdAt).format('D MMM YYYY')}</span>
            </div>
            <span className="list-item__note">{note}</span>    
        </div>
        <h3 className="list-item__data">${(amount / 100).toFixed(2)}</h3>
    </Link>
);

// This is how you do it without destructuring
// Note: in ExpenseList.js you have to pass in expense={expense} instead of {...expense}
//
// export default (props) => (
//     <div>
//         <h3>{props.expense.description}</h3>
//         <p>${(props.expense.amount / 100).toFixed(2)}</p>
//         <p>Created At: {props.expense.createdAt}</p>
//     </div>
// );