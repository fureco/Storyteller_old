module.exports = [
 	 // Add support for native node modules
	{
		test: /\.node$/,
		use: 'node-loader',
	},
	{
		test: /\.(m?js|node)$/,
		parser: { amd: false },
		use: {
			loader: '@marshallofsound/webpack-asset-relocator-loader',
			options: {
				outputAssetBase: 'native_modules',
			},
		},
	},
	{
		test: /\.(js|jsx)$/,
		loader: 'babel-loader',
		exclude: /node_modules/,
		include: /src/
	},
	{
		test: /\.(js|jsx)$/,
		use: 'react-hot-loader/webpack',
		include: /node_modules/
	}
];
