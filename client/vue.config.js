module.exports = {
    publicPath: '/app',
    // indexPath: 'app.html',
    chainWebpack: config => {
        config.plugin('html')
        .tap(arg => {
            arg[0].title = 'Admin';
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