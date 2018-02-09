import React from 'react';
import { shallow } from 'enzyme';
import { filters, altFilters } from '../fixtures/filters';
import { ExpenseListFilters } from '../../components/ExpenseListFilters';

let setTextFilter, sortByDate, sortByAmount, setStartDate, setEndDate, wrapper;

beforeEach(() => {
    setTextFilter = jest.fn();
    sortByDate = jest.fn();
    sortByAmount = jest.fn();
    setStartDate = jest.fn();
    setEndDate = jest.fn();
    wrapper = shallow(
        <ExpenseListFilters
            filters={filters}
            setTextFilter={setTextFilter}
            sortByDate={sortByDate}
            sortByAmount={sortByAmount}
            setStartDate={setStartDate}
            setEndDate={setEndDate}
        />
    );
});

test('should render ExpenseListFilters', () => {
    expect(wrapper).toMatchSnapshot();
});

test('should render ExpenseListFilters with alt data', () => {
    wrapper.setProps({ filters: altFilters });
    expect(wrapper).toMatchSnapshot();
});

test('should handle text change', () =>{
    wrapper.find('input').simulate('change', { target: { value: altFilters.text } });
    expect(setTextFilter).toHaveBeenLastCalledWith(altFilters.text);
});

test('should sort by date', () =>{
    wrapper.setProps({ filters: altFilters });
    wrapper.find('select').simulate('change', { target: {value: 'date' } });
    expect(sortByDate).toHaveBeenCalled();
});

test('should sort by amount', () =>{
    wrapper.find('select').simulate('change', { target: {value: 'amount' } });
    expect(sortByAmount).toHaveBeenCalled();
});

// For whatever reason, Enzyme won't recognize anything from react-dates as nodes, so these fail
test('should handle date changes', () =>{
    wrapper.find('DateRangePicker').prop('onDatesChange')({ 
        startDate: altFilters.startDate, 
        endDate: altFilters.endDate 
    });
    expect(setStartDate).toHaveBeenLastCalledWith(altFilters.startDate);
    expect(setEndDate).toHaveBeenLastCalledWith(altFilters.endDate);
});

test('should handle date focus changes', () =>{
    const calendarFocused = 'endDate';
    wrapper.find('DateRangePicker').prop('onFocusChange')(calendarFocused);
    expect(wrapper.state('calendarFocused')).toBe(calendarFocused);
});