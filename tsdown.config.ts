import { defineConfig } from 'tsdown';

export default defineConfig([
  {
    entry: {
      index: 'index.ts',
      types: 'src/types.ts',
    },
    clean: true,
    format: 'esm',
    unbundle: true,
    minify: 'dce-only',
    fixedExtension: false,
    dts: true,
    platform: 'neutral',
    deps: {
      neverBundle: [/^node:/],
    },
    target: 'esnext',
    exports: true,
  },
  {
    entry: {
      index: 'index.ts',
    },
    clean: false,
    format: 'iife',
    globalName: 'ncCfdiCore',
    unbundle: false,
    minify: true,
    fixedExtension: false,
    dts: false,
    platform: 'browser',
    deps: {
      alwaysBundle: ['@xmldom/xmldom', 'decimal.js'],
      onlyBundle: false,
    },
    target: 'es2022',
  },
]);
