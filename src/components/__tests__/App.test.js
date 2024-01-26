import { render } from '@testing-library/react';
import App from '../App';

test('can be rendered', () => {
  const { container } = render(<App />);
  expect(container).toMatchSnapshot();
});
