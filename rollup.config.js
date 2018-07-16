import executable from 'rollup-plugin-executable';
import commonjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';
import pkg from './package.json';

export default {
  output: {
    file: pkg.main,
    format: 'cjs'
  },

  plugins: [],
  input: pkg.module
};
