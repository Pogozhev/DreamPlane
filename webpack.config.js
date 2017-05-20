const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const extractSass = new ExtractTextPlugin({filename: "css/style.css"});
const NODE_ENV = process.env.NODE_ENV || 'development';
const isDev = NODE_ENV == 'development';
const isProd = NODE_ENV == 'production';

module.exports = { 
	entry: ['webpack/hot/dev-server', 'webpack-hot-middleware/client', __dirname + '/src'],
	output: {
		path: __dirname + '/dist',
		publicPath: 'http://localhost:3000/',
		filename: 'js/app.js'
	},
	devtool: 'source-maps',
	plugins: [
		new webpack.NoEmitOnErrorsPlugin(), 
		new webpack.HotModuleReplacementPlugin(),
		extractSass
	],
	resolve: {
	   	alias: {
	   		modernizr$: path.resolve(__dirname, ".modernizrrc"),
	   		"webfontloader": path.resolve(__dirname, "./node_modules/webfontloader/webfontloader.js")
	   	}
	},
	resolveLoader: {
		moduleExtensions: ["-loader"]
	},
	module: {
		rules: [
	  		// Script loaders
		  	{ 
		    	test: /\.js$/, 
		    	exclude: /\/node_modules\//,
		    	loader: "babel-loader",
		    	options: {
		    		presets: ['es2015', 'react'],
		    		plugins: ['transform-class-properties']
		    	}
			},
			// Style loaders
			{
				test: /\.scss$/,
				use: ['css-hot-loader'].concat(ExtractTextPlugin.extract({
			        use: [
		              	{ loader: 'css-loader', options: {minimize: isProd}},
		              	{ loader: 'postcss-loader', 
		              		options: { 
		              			plugins: function () {
		              				if(!isDev) {
			                      		return [
			                      			require('cssnano')({
										       autoprefixer: false,
										       discardComments: { removeAll: isProd},
										     }),
			                        		require('autoprefixer')
			                      		];
			                    	}
			                    },
			                    sourceMap: true
		              		}
		              	},
		              	{ loader: 'resolve-url-loader'},
		              	{ loader: 'sass-loader', options: {sourceMap: true}}
		            ],
		            fallback: 'style-loader'
		      	}))
			},
			// File loaders
			{
				test: /\.(png|jpg|gif|svg)$/,
				exclude: path.resolve(__dirname, './src/fonts/'),
				use: {
					loader: 'url-loader', options: {limit: 10000, name: '/i/[name].[ext]'}
				}
			},
			// Modernizr loaders
			// TODO: place config form .modernizrrc
			{
		        test: /\.modernizrrc.js$/,
		        loader: "modernizr"
		    },
		    {
		        test: /\.modernizrrc(\.json)?$/,
		        loader: "modernizr!json"
		    }
		]
	}
}


if (isProd) {
  module.exports.plugins.push(new webpack.DefinePlugin({
      'NODE_ENV': `"production"`
  }));
} else {
  module.exports.plugins.push(new webpack.DefinePlugin({
      'NODE_ENV': `"development"`
  }));
}