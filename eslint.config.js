import eienjs from '@eienjs/eslint-config';

export default eienjs({
  markdown: true,
  typescript: {
    tsconfigPath: 'tsconfig.json',
    erasableSyntaxOnly: {
      parameterProperties: false,
    },
  },
  unicorn: {
    overrides: {
      // Note: Disable for xml schema http urls
      'unicorn/prefer-https': 'off',
    },
  },
});
