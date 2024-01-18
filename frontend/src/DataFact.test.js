import { render, screen } from '@testing-library/react';
import DataFact from './DataFact';


test('renders without crashing', () => {
    render(<DataFact />);
  });
  
  test('matches snapshot', () => {
    const { asFragment } = render(<DataFact />);
    expect(asFragment()).toMatchSnapshot();
  });