import React from 'react';
import { ExpenseSummary } from '../../components/ExpenseSummary';
import { shallow } from 'enzyme';
import expenses from '../fixtures/expenses';

test('should properly render summary of expenses', () => {
    const wrapper = shallow(<ExpenseSummary expenses={expenses} />);
    expect(wrapper).toMatchSnapshot();
});

test('should properly render 1 expense', () => {
    const wrapper = shallow(<ExpenseSummary expenses={[expenses[0]]} />);
    expect(wrapper).toMatchSnapshot();
});