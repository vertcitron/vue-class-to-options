import typescript from 'rollup-plugin-typescript2';
import pkg from './package.json';
import {terser} from "rollup-plugin-terser";

export default {
 input: 'src/index.ts', // our source file
 output: [
  {
   file: 'dist/cjs-module.js',
   format: 'cjs'
  },
  {
   file: 'dist/es-module.js',
   format: 'es' // the preferred format
  }
 ],
 external: [
  ...Object.keys(pkg.dependencies || {})
 ],
 plugins: [
  typescript({
   typescript: require('typescript'),
  }),
  terser() // minifies generated bundles
 ]
};