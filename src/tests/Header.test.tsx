import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
//import renderer from 'react-test-renderer';
import Header from '../Components/Header/Header.tsx';

const mockedUsedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom') as any,
  useNavigate: () => mockedUsedNavigate,
}));

const mockedDispatch = jest.fn();
jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux') as any,
  useDispatch: () => mockedDispatch,
}));

describe('Header', () => {

  test('Header logo render', () => {
    render(<Header />);
    const linkElem = screen.getByText('Products Shop');
    expect(linkElem).toBeInTheDocument();
  });

  it('Header renders correctly', () => {
    const tree = render(<Header />)
    expect(tree).toMatchSnapshot();
  });
})

