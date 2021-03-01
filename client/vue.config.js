module.exports = {
    chainWebpack: config => {
        config.plugin('html')
        .tap(arg => {
            arg[0].title = 'Name of blog';
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