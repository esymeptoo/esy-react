const path = require('path'),
    env = process.env.NODE_ENV,
    autoprefixer = require('autoprefixer'),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    webpack = require('webpack'),
    ExtractTextPlugin = require("extract-text-webpack-plugin")
    // extractVendor = new ExtractTextPlugin('css/vendor.css'), // 抽取bootstrap和font-awesome公共样式
    // extractStyle = new ExtractTextPlugin('css/style.css'); // 抽取自定义样式

const _postCss = {
    sourceMap: true,
    plugins: (loader) => [
        require('autoprefixer')({
            browsers: ['last 15 versions']
        })
    ]
}
module.exports = {
    entry: process.env.NODE_ENV === 'production' ? {
        index: path.join(__dirname, 'examples/index.tsx'),
        vendor: ['react', 'react-dom']
    } : [
            'webpack-dev-server/client?http://localhost:8080',
            'webpack/hot/only-dev-server',
            path.join(__dirname, './examples/index.tsx')
        ],
    output: {
        filename: 'static/[name].js',
        path: path.resolve(__dirname, './build'),
        publicPath: '../',
        // chunkFilename: "chunk.[name].[chunkhash].js" // 对于按需加载的模块，都不会写在entry入口文件中，chunkFilename是给这些按需加载模块的命名规则
    },
    context: __dirname,
    module: {
        rules: [{
            test: /\.less$/,
            use: env === 'dev' ? ['style-loader', 'css-loader', {
                loader: 'postcss-loader',
                options: {
                    plugins: [require('autoprefixer')({
                        browsers: [
                            'Android > 4',
                            'iOS > 8'
                        ]
                    })]
                }
            }, 'less-loader']
            : ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: ['css-loader', {
                    loader: 'postcss-loader',
                    options: {
                        plugins: [require('autoprefixer')({
                            browsers: [
                                'Android > 4',
                                'iOS > 8'
                            ]
                        })]
                    }
                }, 'less-loader'],
                publicPath: '/static'
            })
        }, {
            test: /\.(jpg|png)$/, // 处理.png和.jpg格式的图片文件
            use: [
                'url-loader?limit=10000&name=img/[name].[ext]' // limit参数指图片大小的最大值，当小于这个值时图片转为base64，name参数指图片文件的命名格式，前面可以加 img/ 表示图片存储路径
            ]
        }, {
            test: /\.html$/,
            use: 'html-loader?interpolate=require'
        }, {
            test: /\.(js|ts)x$/,
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['env']
                }
            }
        }, {
            test: /\.(eot|svg|ttf|woff|woff2)(\?\S*)?$/,
            use: [
                'file-loader?name=fonts/[name].[ext]'
            ]
        }]
    },
    plugins: process.env.NODE_ENV === 'production' ? [

        new HtmlWebpackPlugin({
            template: './index.html',
            filename: 'html/index.html'
        }),
        new ExtractTextPlugin('static/[name].css'),
        new webpack.DefinePlugin({
            'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
        }),
        new webpack.optimize.UglifyJsPlugin({
            minimize: true,
            compress: {
                warnings: false
            }
        }),
        // CommonsChunkPlugin可以让我们在几个模块之间抽取出公共部分内容，并且把他们添加到公共的打包模块中
        new webpack.optimize.CommonsChunkPlugin({
            name: "vendor", // 模块名
            filename: "vendor.js",  // 文件名
            minChunks: Infinity, // 该模块至少被其他模块调用多少次时，才会被打包到公共模块中，这个数字必须大于等于2，当传入Infinity时会马上生成
        }),

        // ProvidePlugin可以全局引入某个模块，在其他模块不需要再手动引入且可以直接调用，也能解决其他第三方库(像bootstrap)对jquery的依赖
    ] : [
            new HtmlWebpackPlugin({
                template: 'index.html',
                filename: 'html/index.html'
            }),
            new webpack.HotModuleReplacementPlugin(),
            new webpack.NamedModulesPlugin(),
            new webpack.DefinePlugin({
                'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
            }),
        ],
    devServer: {
        contentBase: path.resolve(__dirname, 'src'),
        hot: true,
        noInfo: false
    },
    devtool: 'source-map',
    resolve: {
        extensions: ['.js', '.less', '.html', '.jsx', '.tsx', 'ts']
    }
};