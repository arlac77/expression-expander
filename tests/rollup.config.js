import multiEntry from 'rollup-plugin-multi-entry';

export default {
  input: 'tests/**/*-test.js',
  output: {
    file: 'build/test-bundle.js',
    sourcemap: true,
    format: 'cjs'
  },
  external: ['ava'],
  plugins: [multiEntry()]
};
