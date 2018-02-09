import expensesReducer from '../../reducers/expenses';
import expenses from '../fixtures/expenses';

test('should default', () => {
    const state = expensesReducer(undefined, { type: '@@INIT' });
    expect(state).toEqual([])
});

test('should add expense', () => {
    const action = { type: 'ADD_EXPENSE', expense: expenses[0] };
    const state = expensesReducer(expenses, action);
    expect(state).toEqual([...expenses, expenses[0]])
});

test('should remove expense by id', () => {
    const action = { type: 'REMOVE_EXPENSE', id: expenses[1].id };
    const state = expensesReducer(expenses, action);
    expect(state).toEqual([expenses[0], expenses[2]]);
});

test('should not remove expense if id not found', () => {
    const action = { type: 'REMOVE_EXPENSE', id: -1 };
    const state = expensesReducer(expenses, action);
    expect(state).toEqual(expenses);
});

test('should edit expense', () => {
    const action = { type: 'EDIT_EXPENSE', id: expenses[0].id, updates: { createdAt: 1000 } };
    const state = expensesReducer(expenses, action);
    expect(state[0].createdAt).toBe(action.updates.createdAt);
});

test('should not edit expense if id not found', () => {
    const action = { type: 'EDIT_EXPENSE', id: -1, updates: { } };
    const state = expensesReducer(expenses, action);
    expect(state).toEqual(expenses);
});