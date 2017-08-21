import pkg from './package.json';

export default {
  input: 'src/expander.js',
  output: {
    file: pkg.main,
    format: 'cjs'
  },
  plugins: []
};
