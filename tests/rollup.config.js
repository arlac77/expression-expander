import multiEntry from 'rollup-plugin-multi-entry';

export default {
  input: 'tests/**/*-test.js',
  external: ['ava'],
  plugins: [multiEntry()],
  dest: 'build/test-bundle.js',
  sourceMap: true,
  output: {
    file: 'build/test-bundle.js',
    format: 'cjs',
    sourcemap: true
  }
};
