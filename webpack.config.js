/*
* @Author: CuiXing
* @Date:   2018-02-16 02:05:49
* @Last Modified by:   CuiXing
* @Last Modified time: 2018-02-17 21:18:06
*/
var webpack             = require('webpack');
var path                = require('path');
var ExtractTextPlugin   = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin   = require('html-webpack-plugin');
// 环境变量, dev, (test), online
var WEBPACK_ENV         = process.env.WEBPACK_ENV || 'dev'; 
//返回html文件对应的参数
var getHtmlConfig = function(name, title){
	return{
      title             : title,
			//目标文件,相对于dist
		  filename        : 'view/'+name+'.html',
		  //源文件
      template        : './src/view/'+name+'.html',
      inject          : true,
      hash            : true,
      //将common和【name】文件夹下的文件打包到对应的html文件中
      chunks          : ['common', name],
	};
};
//webpack配置
var config = {
  entry: {
  	//公共部分
  	'common' : ['./src/page/common/index.js'],
    //其他部分
  	'index' : ['./src/page/index/index.js'],
    'user-login'        : ['./src/page/user-login/index.js'],
    'user-register'     : ['./src/page/user-register/index.js'],
    /*
    'list'              : ['./src/page/list/index.js'],
    'detail'            : ['./src/page/detail/index.js'],
    'cart'              : ['./src/page/cart/index.js'],
    
    'user-pass-reset'   : ['./src/page/user-pass-reset/index.js'],
    'user-center'       : ['./src/page/user-center/index.js'],
    'user-center-update': ['./src/page/user-center-update/index.js'],
    'user-pass-update'  : ['./src/page/user-pass-update/index.js'],
    */
    'result'            : ['./src/page/result/index.js'],
  },
  output: {
  	//目标文件存放路径
    path: path.resolve(__dirname, './dist'),
    //访问路径,为了能够在开发模式下浏览器实时刷新,此路径相对于localhost:8086
    publicPath: '/dist',
    //[name].js为目标文件名（根据入口文件名命名目标文件名）
    filename: 'js/[name].js'
  },
  //外部依赖的声明
  externals:{
        'jquery'    :'window.jQuery',
  },
  //路径别名设置，方便引用
  resolve : {
      alias : {
          node_modules    : __dirname + '/node_modules',
          util            : __dirname + '/src/util',
          page            : __dirname + '/src/page',
          service         : __dirname + '/src/service',
          image           : __dirname + '/src/image'
      }
  },
  module: {
        // noParse: [],
        loaders: [
        	{ test: /\.css$/, 
        	loader: ExtractTextPlugin.extract({
                use: 'css-loader',
                fallback : 'style-loader'
        	})
        	},
          { test: /\.(gif|png|jpg|woff|svg|eot|ttf)\??.*$/, loader: 'url-loader?limit=100&name=resource/[name].[ext]' },
          { test: /\.string$/, loader: 'html-loader'}
        ]
  },  
  plugins: [
  	//提出公共部分
  	new webpack.optimize.CommonsChunkPlugin({
        name : 'common',
        filename : 'js/base.js'
    }),
    //css单独处理插件
    new ExtractTextPlugin('css/[name].css'),
        //html加载插件
        new HtmlWebpackPlugin(getHtmlConfig('index', '首页')),
        new HtmlWebpackPlugin(getHtmlConfig('user-login', '用户登录')),
        new HtmlWebpackPlugin(getHtmlConfig('user-register', '用户注册')),
        /*
        new HtmlWebpackPlugin(getHtmlConfig('list', '商品列表页')),
        new HtmlWebpackPlugin(getHtmlConfig('detail', '商品详情页')),
        new HtmlWebpackPlugin(getHtmlConfig('cart', '购物车')),
        
        new HtmlWebpackPlugin(getHtmlConfig('user-pass-reset', '找回密码')),
        new HtmlWebpackPlugin(getHtmlConfig('user-center', '个人中心')),
        new HtmlWebpackPlugin(getHtmlConfig('user-center-update', '修改个人信息')),
        new HtmlWebpackPlugin(getHtmlConfig('user-pass-update', '修改密码')),
        */
        new HtmlWebpackPlugin(getHtmlConfig('result', '操作结果')),    
  ]
};

// 开发环境下，使用devServer热加载
if(WEBPACK_ENV === 'dev'){
    config.entry.common.push('webpack-dev-server/client?http://localhost:8086');
}
module.exports = config;