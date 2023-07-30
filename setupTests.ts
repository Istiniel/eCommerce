import matchers from '@testing-library/jest-dom/matchers';
import { cleanup } from '@testing-library/react';
import { afterEach, expect } from 'vitest';
import './testServer';

expect.extend(matchers);

afterEach(() => {
  cleanup();
});
