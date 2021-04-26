module.exports = {
    publicPath: './',
    assetsDir: 'static',
    productionSourceMap: false,

    lintOnSave: false,

    devServer: {
        proxy: {
            '/api': {//这里写你前端发送请求时请求的url通配形式
                target: 'http://127.0.0.1:8081',//这里写你后端的地址
                changeOrigin: true,
                pathRewrite: {
                    '^/api': ''//实际请求去掉/api
                },
            },
            }
        }

}