import babel from 'rollup-plugin-babel'

export default {
  input: 'index.js',

  plugins: [
    babel({
      exclude: 'node_modules/**'
    })
  ],
  output: [
    { file: 'dist/bundle.cjs.js', format: 'cjs' },
    { file: 'dist/bundle.umd.js', format: 'umd' },
    { file: 'dist/bundle.es.js', format: 'es' }
  ]
}
