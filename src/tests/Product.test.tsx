import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Product from '../Components/Product/Product.tsx';

const mockedUsedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom') as any,
  useNavigate: () => mockedUsedNavigate,
}));

const mockedSelector = jest.fn();
const mockedDispatch = jest.fn();
jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux') as any,
  useSelector: () => mockedSelector,
  useDispatch: () => mockedDispatch,
}));

describe('Product', () => {

  test('Product module render', () => {
    render(<Product />);
    const linkElem = screen.getByText('Add to cart');
    expect(linkElem).toBeInTheDocument();
  });

  it('Product matches snapshot', () => {
    const tree = render(<Product />)
    expect(tree).toMatchSnapshot();
  });
})

