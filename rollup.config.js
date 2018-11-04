import typescript from 'rollup-plugin-typescript';

export default {
   input: './lab-works/l2/src/index.ts',
   output: {
      file: './lab-works/l2/app/js/bundle.js',
      format: 'iife',
      name: 'l2'
   },
   plugins: [typescript()]
};
