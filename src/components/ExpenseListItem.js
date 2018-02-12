import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';

export default ({ id, description, amount, createdAt }) => (
    <div>
        <Link to={`/edit/${id}`}>
            <h3>{description}</h3>
        </Link>
        <p>${(amount / 100).toFixed(2)}</p>
        <p>{moment(createdAt).format('D MMM YYYY')}</p>
        
    </div>
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