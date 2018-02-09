import React from 'react';
import { shallow } from 'enzyme';
import NotFound from '../../components/NotFound';

test('should ouput NotFound page', () => {
    const wrapper = shallow(<NotFound />);
    expect(wrapper).toMatchSnapshot();
});