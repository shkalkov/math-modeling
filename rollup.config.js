import typescript from 'rollup-plugin-typescript';

export default {
   input: './lab-works/l1/src/rngs/index.ts',
   output: {
      file: './lab-works/l1/app/js/bundle.js',
      format: 'iife',
      name: 'l1'
   },
   plugins: [typescript()]
};
