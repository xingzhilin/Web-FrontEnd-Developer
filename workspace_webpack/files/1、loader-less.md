#  cnpm install less --save-dev

# npm install style-loader css-loader less-loader --save-dev

# 配置
    module: {
        rules: [{
            test: /\.less$/,
            use: ['style-loader', 'css-loader', 'less-loader']
        }]
    }