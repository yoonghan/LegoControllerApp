import React from 'react';
import {shallow, mount} from 'enzyme';
import App from './App';

describe('App', () => {
    describe('Rendering', () => {
        it('should match to snapshot', () => {
            const component = shallow(<App/>)
            expect(component).toMatchSnapshot();
        });
        it('component can be tested', () => {
            const wrapper = mount(<App/>)
            expect(wrapper.findWhere(node => node.prop('testID') === 'jest-test')).toBe(true);
        });
    });
});
