import { defineConfig } from 'tsdown';

export default defineConfig({
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
});
