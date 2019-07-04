// rollup.config.js
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';

export default {
  input: 'client.js',
  output: {
    file: 'client.out.js',
    format: 'iife',
    name: 'grpc'
  },
  name: 'MyModule',
  plugins: [
    resolve(),
    commonjs()
  ]
};
