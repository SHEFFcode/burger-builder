import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import NavigationItems from './NavigationItems';
import NavigationItem from './NavigationItem/NavigationItem';

configure({ adapter: new Adapter() });

describe('<NavigationItems />', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<NavigationItems />);
  });

  it('should render two navigation items', () => {
    expect(wrapper.find(NavigationItem)).toHaveLength(2);
  });

  it('should have a Burger Builder link', () => {
    expect(wrapper.contains(<NavigationItem link="/" exact>BurgerBuilder</NavigationItem>));
  });
});