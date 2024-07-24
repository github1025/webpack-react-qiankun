// webpack.config.js
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin'); // 引入插件
const AnalyzeWebpackPlugin = require('./webpack_plugins/analyze-webpack-plugin.js');
const { DomToCodeWebpackPlugin, goCode } = require('./webpack_plugins/DomToCodeWebpackPlugin/index.js')
const webpack = require('webpack');
const packageName = require('./package.json').name;
const getEntry = require('./webpack_config/getEntry')
const entry = getEntry('./src/page');
const staticPath = `http://localhost:9001`
let version = process.env.version === "dev" ? "development" : "production";
console.log("version", process.env.version)
console.log("entry", entry)
console.log("packageName", packageName)

let currentEntry = {}
let menuList = []
Object.keys(entry).map(key=>{
	menuList.push(key)
})
if (process.env.entry) {
	let entrys = process.env.entry.split(",")
	console.log("entry1", entrys)
	entrys.forEach( t => {
		if (entry[t.trim()]) {
			currentEntry[t.trim()] = entry[t.trim()]
		}
	})
} else {
	currentEntry = entry
}

console.log("currentEntry", currentEntry)
console.log("__dirname", __dirname)
const config = {
	entry: currentEntry,
	output: {                                             // webpack打包后出口文件
		filename: '[name]-bundle.js',                     // 打包后js文件名称
		chunkFilename: '[name].chunk.js', // 设置chunk的文件名
		// path: path.resolve(__dirname, 'dist'),    // 打包后自动输出目录
		path: path.resolve(__dirname, 'public/js/build/'),    // 打包后自动输出目录
		publicPath: '/', // 设置公共路径
		// publicPath: 'http://localhost:9001/static/js/build/', // 设置公共路径
		library: `${packageName}-[name]`,
		libraryTarget: 'umd',
		chunkLoadingGlobal: `webpackJsonp_${packageName}`,
	},
	resolve: {
		extensions: [".ts", ".tsx", ".js", ".json"]
	},
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader'
				}
			},
			{
				test: /\.tsx?$/,
				use: 'ts-loader',
				exclude: /node_modules/,
			},
			// {
			// 	test: /\.tsx?$/,
			// 	exclude: /node_modules/,
			// 	loader: 'babel-loader',
			// 	options: {
			// 		presets: [
			// 			'@babel/preset-env',
			// 			'@babel/preset-react',
			// 			'@babel/preset-typescript'
			// 		]
			// 	}
			// },
			{
				test: /\.css$/,
				use: ['style-loader', 'css-loader']
			},
			{
				test: /\.scss/,
				use: [
					"style-loader",
					"css-loader",
					"sass-loader",
				]
			},
			{
				test: /\.(png|svg|jpg|gif)$/,
				use: ['url-loader']
			},
			{
				test: /\.(woff|woff2|eot|ttf|otf)$/,
				use: ['url-loader']
			}
		]
	},
	optimization:{
		moduleIds: "named"
	},
	// externals:{
	// 	"entry":"entry"
	// },
	plugins: [
		// new HtmlWebpackPlugin({
		// 	title: 'index',
		// 	// filename: "login.html",
		// 	template: './index2.html',    // 模板文件位置
		// 	chunks: ['index']
		// }),
		// new AnalyzeWebpackPlugin(),
		new DomToCodeWebpackPlugin(),
		new HtmlWebpackPlugin({
			title: 'index',
			// filename: "login.html",
			template: './index.html',    // 模板文件位置
			chunks: ['main-router']
		}),		// 配置plugin
		new webpack.HotModuleReplacementPlugin(),
		// new webpack.ProvidePlugin({
		// 	process: 'process/browser',
		// }),
		new webpack.DefinePlugin({
			'process.env.staticPath': JSON.stringify(staticPath),
			'process.env.menus': JSON.stringify(menuList),
			'process.env.dirname': JSON.stringify(__dirname)
		})
	],
	devServer: {
		// contentBase: './dist',
		// host: 'localhost',
		port: 9001,
		hot: true,
		historyApiFallback: true,
		compress: true,
		allowedHosts: 'all',
		headers:{
			'Access-Control-Allow-Origin':'*'
		},
		client: {
			overlay: false,
			webSocketURL: {
				hostname: 'localhost',
				port: 9001,
				protocol: 'ws',
				pathname: '/ws'
			},
		},
		setupMiddlewares: (middlewares, devServer) => {
			// 允许跨域请求
			devServer.app.use((req, res, next) => {
				res.header('Access-Control-Allow-Origin', '*');
				res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
				next();
			});
			devServer.app.get('/dom-to-code', (req, response) => {
				console.log("req.query", req.query)
				goCode(req.query,(res)=>{
					response.send(res);
				})
			});
			return middlewares;
		}
	}
}
// const pages = Object.keys(config.entry);
// config.plugins = config.plugins.concat(pages.map(page => {
// 	// 每个入口文件都会用一个和它同名的模板文件生成同名的 html
// 	// 需要多少个 HTML，就构建多少个 HTML Webpack Plugin 实例
// 	return new HtmlWebpackPlugin({
// 		// 我厂要求首页=/qk-container-index.html，其它功能页生成子目录，比如关于我们(about)=/about/qk-container-index.html
// 		filename: page === 'index' ? `${page}.html` : `${page}/qk-container-index.html`,
// 		// 根据当前页面的名称，找到合适的 pug 文件
// 		// 关于 pug 使用，请看下一章节
// 		template: path.resolve(__dirname, `../page/${page}/entry.js`),
// 		// 这个页面里只加载和本页相关的资源
// 		// 注意这里不能是 `${page}.js`，因为我们会把其它资源提取出来，独立存在物理文件
// 		// 有扩展名的话，就不会加载其它文件了
// 		chunks: [page],
// 	});
// }));
module.exports = config