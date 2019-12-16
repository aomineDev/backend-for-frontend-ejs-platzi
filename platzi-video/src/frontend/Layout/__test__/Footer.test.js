import React from 'react';
import { create } from 'react-test-renderer';
import { render, shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Footer from '../Footer';

configure({ adapter: new Adapter() });

describe('Footer testing', () => {
  test('Match Snapshot', () => {
    const footer = create(<Footer />);
    expect(footer.toJSON()).toMatchSnapshot();
  });

  test('footer haves class .Footer', () => {
    const footer = shallow(<Footer />);
    const footerElem = footer.find('footer');
    expect(footerElem.hasClass('Footer')).toBe(true);
  });

  test('footer haves 3 anchor tags', () => {
    const footer = render(<Footer />);
    expect(footer.find('a')).toHaveLength(3);
  });
});
