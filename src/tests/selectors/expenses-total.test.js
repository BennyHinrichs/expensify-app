import { shallow } from 'enzyme';
import expenses from '../fixtures/expenses';
import selectExpensesTotal from '../../selectors/expenses-total';

test('should return 0 if no expenses', () => {
    const res = selectExpensesTotal([]);
    expect(res).toBe(0);
});

test('should correctly add up a single expense', () => {
    const res = selectExpensesTotal([expenses[0]]);
    expect(res).toBe(4000);
});

test('should correctly add up multiple expenses', () => {
    const res = selectExpensesTotal(expenses);
    expect(res).toBe(60500);
});