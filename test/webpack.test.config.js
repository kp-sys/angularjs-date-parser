const path = require('path');

module.exports = ({
    mode: 'development',

    externals: {
        angular: 'angular'
    },

    module: {
        rules: [
            {
                enforce: 'pre',
                test: /\.ts$/,
                include: [/src/],
                loader: 'tslint-loader'
            },
            {
                test: /\.ts$/,
                include: [/(src)|(test)/],
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            plugins: [
                                'angularjs-annotate'
                            ],
                            presets: [
                                '@babel/preset-env'
                            ]
                        }
                    },
                    {
                        loader: 'ts-loader',
                        options: {
                            onlyCompileBundledFiles: true
                        }
                    }
                ]
            },
            {
                test: /\.ts$/,
                enforce: 'post',
                loader: 'istanbul-instrumenter-loader',
                exclude: [/((\.spec\.)|test|node_modules)/],
                query: {
                    esModules: true
                }
            }
        ]
    },

    resolve: {
        extensions: ['.js', '.ts'],
        alias: {
            utils: path.resolve(__dirname, 'utils')
        }
    },

    devtool: 'inline-source-map'
});
