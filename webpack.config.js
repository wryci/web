var path = require('path');

//导入css分离插件
var MiniCssExtractPlugin = require('mini-css-extract-plugin');
//导入处理html插件
var HTML_WEBPACK_PLUGIN = require('html-webpack-plugin');

//创建一个分离css实例
var miniCssExtractPlugin = new MiniCssExtractPlugin({
  //输出css名称
  filename: '[name][hash].css'
});

var htmlWebpackPlugin = new HTML_WEBPACK_PLUGIN({
  	//模板路径
	template: './index.html',
	//打包脚本注入方式
  	//true: 将打包输出的脚本添加到body结束标签之前, 默认
  	//false: 不添加打包脚本
  	//head: 将打包输出的脚本添加到head结束标签之前
  	//body: 将打包输出的脚本添加到body结束标签之前
	inject: true,

	minify: {
		//去除注释
		removeComments: true,
		//移除标签属性的引号
		removeAttributeQuotes: true,
		//去除空白符
		collapseWhitespace: true
	},

	filename:'index.html'

});

//Node.js导出方式
module.exports = {

	//development: 开发模式 production: 生产模式
	mode: 'development',

	//入口
	
	// entry: './js/index.js',

	// entry: [

	// 	'./js/index.js',
	// 	'./js/a.js',
	// 	'./js/b.js'
	// ],

	// entry: {

	// 	index: './js/index.js',
	// 	a: './js/a.js',
	// 	b: './js/b.js'
	// },

	entry: {

		index: './js/index.js',
		// ab: ['./js/a.js', './js/b.js']
	},

	//出口
	output: {

		//输出路径
		path: path.resolve( __dirname, 'public'),

		//输出文件名
		// filename: 'build.js'
		
		//添加[name]
		filename: '[name].min.js'
		
		//添加[hash]
		// filename: '[hash].min.js'
		 
		//添加[name][hash]
		// filename: '[name][hash].min.js'
		
	},

	//modele模块 用于配置loader
	module: {

		//定义loader解析规则
		rules: [

			//配置css-loader
			{
				test: /\.css$/, 
				use: [
					// {loader: 'style-loader'},
          			{loader: MiniCssExtractPlugin.loader},
					{loader: 'css-loader'}
				]
			},

			//配置less-loader
			{
				test: /\.less$/, 
				use: [
					// {loader: 'style-loader'},
          			{loader: MiniCssExtractPlugin.loader},
					{loader: 'css-loader'},
					{loader: 'less-loader'}

				]
			},

			//配置url-loader
			{
				test:/\.(gif|png|jpg|jpeg|woff|svg|eot|ttf).??.*$/, 
				use: [

					{
						loader: 'url-loader', 

						//指定图片转base64码的范围 单位为B
						options: {
							limit: 10240,
							esModule: false,

						},
					},

				]
			},

			//配置html-withimg-loader
			{
				test: /\.html$/, 
				use: [
					{loader: 'html-withimg-loader'},
				]
			},

		]
	},

	//插件
    plugins: [
      //分离css插件
      miniCssExtractPlugin,

      //处理html模板
   	  htmlWebpackPlugin
    ],

    //配置本地服务器
    devServer: {
    	//服务器ip
    	host: 'localhost',

    	// 监听端口
    	port: 8001,

    	//自动打开浏览器
    	open: true,

    	//当页面出错时，错误信息会显示在网页中
    	// inline: false

    	//编译过程中显示进度百分比
    	progress: true,

   		//webpack本地服务器路由
    	before(app){
    		//req: 请求对象
        	//res: 响应对象
    		app.get('/pros',(req, res) =>{
    			res.json({name: 'webpack本地服务器', status: 'ok'});
    		});
    
    	}
    }

};