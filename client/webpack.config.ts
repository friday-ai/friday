import * as webpack from 'webpack';
import { resolve, join } from 'path';
import * as HtmlWebpackPlugin from 'html-webpack-plugin';
import * as CopyPlugin from 'copy-webpack-plugin';

// tslint:disable-next-line: naming-convention
const { HotModuleReplacementPlugin } = webpack;
const port = 1444;
const context = __dirname + '/src';

interface WebpackEnvironment {
  NODE_ENV: string;
}

module.exports = (env: WebpackEnvironment, argv: { mode: string }) => {
  const appEntryPoints = argv.mode === 'production'
  ? ['./index']
  : [
      `webpack-dev-server/client?http://localhost:${port}`,
      'webpack/hot/only-dev-server',
      './index'
    ];

  const config: webpack.Configuration = {
    name: 'client',
    target: 'web',
    context,
    stats: 'none',
    entry: {
      app: appEntryPoints
    },
    output: {
      filename: '[name].js',
      path: resolve(__dirname, 'dist')
    },
    resolve: {
      extensions: ['.ts', '.tsx', '.js', 'jsx']
    },
    devtool: argv.mode === 'production' ? 'source-map' : 'cheap-eval-source-map',
    module: {
      rules: [
        {
          enforce: 'pre',
          test: /\.tsx?$/,
          loader: 'tslint-loader',
          exclude: /node_modules/,
          options: {
            configFile: resolve(__dirname, '../tslint.json'),
            emitErrors: true,
            failOnHint: true,
            typeCheck: true
          }
        },
        {
          test: /\.tsx?$/,
          loader: 'ts-loader',
          exclude: /node_modules/
        }
      ]
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './index.html',
        hash: true,
        filename: 'index.html',
        inject: 'body'
      }),
      new CopyPlugin({
        patterns: [
          { from: './assets', to: '../dist/assets' }
        ]
      }),
      new HotModuleReplacementPlugin()
    ]
  };

  if (argv.mode === 'development') {
    config.stats = 'verbose';
    config.devServer = {
      contentBase: join(__dirname, 'dist'),
      compress: true,
      port: 9000,
      watchOptions: {
        aggregateTimeout: 500,
        poll: 1000
      }
    };
  }

  return config;
};
