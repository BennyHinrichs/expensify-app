//Expenses Reducer

const expensesReducerDefaultState = [];

export default (state = expensesReducerDefaultState, action) => {
    switch (action.type) {
        default:
            return state;
        case 'ADD_EXPENSE':
            return [
                ...state,
                action.expense
            ];
        case 'REMOVE_EXPENSE':
            return state.filter(({ id }) => id !== action.id);
        case 'EDIT_EXPENSE':
            return state.map((expense) => {
                if (expense.id === action.id) {
                    return {                // return new object
                        ...expense,         // pass all its existing properties down
                        ...action.updates   // override properties input by user
                    }
                } else {
                    return expense;
                }
            });
    }
};

