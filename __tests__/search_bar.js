import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

import * as React from 'react';
import { shallow } from 'enzyme';
import SearchBar from '../src/components/search_bar';

describe('SearchBar component', () => {
  let component = shallow(<SearchBar/>);

  it("Sholud have a div wrapper", () => {
    expect(component.type()).toEqual('div');
  });

  it("Sholud have an input field", () => {
    expect(component.find('input').length).toBe(1);
  });
});
