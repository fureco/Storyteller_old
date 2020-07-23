const rules = require('./webpack.rules');

rules.push({
    test: /\.css$/,
	use: [{ loader: 'style-loader' }, { loader: 'css-loader' }, { loader: 'postcss-loader' }],
});

rules.push({
    test: /\.(jsx|js)$/,
	use: [{ loader: 'babel-loader' }],
});

rules.push({
	test: /\.(jpe?g|png|gif)$/,
	use: [{ loader: 'file-loader?name=img/[name]__[hash:base64:5].[ext]' }],
});

rules.push({
	test: /\.(eot|svg|ttf|woff|woff2)$/,
	use: [{ loader: 'file-loader?name=font/[name]__[hash:base64:5].[ext]' }],
});

module.exports = {
  // Put your normal webpack config below here
  module: {
    rules,
  },
};
