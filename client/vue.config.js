module.exports = {
    publicPath: '/app',
    // indexPath: 'app.html',
    chainWebpack: config => {
        config.plugin('html')
        .tap(arg => {
            arg[0].title = 'Blog Title';
            return arg
        })
    },
    devServer: {
        proxy: {
            '/':{
                target: "http://localhost:5000",
                ws: true
            },
        }
    }
}