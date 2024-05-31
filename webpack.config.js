const path = require('path');

module.exports = {
  mode: 'development',
  entry: './src/js/index.js', // Modifica il percorso dell'entry point
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
};
