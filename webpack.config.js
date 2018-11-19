// webpack.config.js

var path = require('path');

module.exports = {
  // entry: path.resolve(__dirname, 'src/js/app2.js'
  // entry: ['src/js/app2.js','src/js/app3.js'],
 //  output: {
	// path: path.resolve(__dirname, 'dist/bundle-js')//,
	// //filename: 'bundle.js'
 //  },
  //vendor: ['jquery'], //第三方库
  // externals: {
  //   $: 'window.$'
  // },
  module: {
	loaders: [
	{
	  test: /\.jsx?$/,
	  exclude: /node_modules/,
	  loader: 'babel',
	  query: {
		presets: ['es2015','react']
	  }
	},
	{
	  test: /\.(png|jpg|gif)$/,
	  loader: 'url-loader?limit=8192' // 这里的 limit=8192 表示用 base64 编码 <= ８K 的图像
	},
	{
	 test: /\.css$/,
	 loader: 'style!css'
	}
	]
  },
 plugins: [
 //    new webpack.ProvidePlugin({
 //        $: 'jquery'
 //    }),//这个可以使jquery变成全局变量，妮不用在自己文件require('jquery')了
 //    new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.bundle.js')//这是妮第三方库打包生成的文件
 ]
};