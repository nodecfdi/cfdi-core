import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    setupFiles: ['./test_helpers/xml_matcher.ts'],
    coverage: {
      provider: 'istanbul',
      reporter: ['text', 'lcov'],
      include: ['src/**/*.ts'],
    },
    isolate: false,
  },
});
