import pkg from './package.json';

export default {
  output: [{
    dest: pkg.main,
    format: 'cjs'
  }],
  plugins: []
};
