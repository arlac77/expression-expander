import multiEntry from 'rollup-plugin-multi-entry';

export default {
  input: 'tests/**/*-test.js',
  external: ['ava'],
  plugins: [multiEntry()],
  format: 'cjs',
  dest: 'build/test-bundle.js',
  sourceMap: true
};
