import { describe, test, expect } from 'vitest';
import { render } from '@testing-library/react';
import App from './App';

describe('App', () => {
  test('renders without crashing', () => {
    render(<App />);
    expect(document.body).toBeDefined();
  });
});
