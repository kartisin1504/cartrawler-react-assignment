
const path=require('path')
const HtmlWebpackPlugin=require('html-webpack-plugin')
module.exports={
  entry:path.resolve(__dirname,'src/index.tsx'),
  output:{path:path.resolve(__dirname,'dist'),filename:'assets/js/[name].[contenthash].js',publicPath:'/'},
  resolve:{extensions:['.ts','.tsx','.js','.jsx']},
  module:{rules:[
    {test:/\.(ts|tsx|js|jsx)$/,exclude:/node_modules/,use:'babel-loader'},
    {test:/\.css$/,use:['style-loader','css-loader']},
    {test:/\.(png|jpg|jpeg|gif|svg)$/i,type:'asset/resource',generator:{filename:'assets/img/[name][ext]'}}
  ]},
  plugins:[new HtmlWebpackPlugin({template:path.resolve(__dirname,'public/index.html'),scriptLoading:'defer'})]
}
