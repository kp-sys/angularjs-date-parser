const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const UnminifiedWebpackPlugin = require('unminified-webpack-plugin');

module.exports = (env, {mode}) => ({
    mode: 'none',

    entry: mode === 'production' ? {
        'angularjs-date-parser.min': ['./src/kp-date-parser/kp-date-parser.module.ts']
    } : {
        'angularjs-date-parser': ['./src/kp-date-parser/kp-date-parser.module.ts']
    },

    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js',
        library: 'angularjs-date-parser',
        libraryTarget: 'umd'
    },

    externals: {
        angular: 'angular',
        '@kpsys/angularjs-register': '@kpsys/angularjs-register',
        'luxon': 'luxon'
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
                include: [/src/],
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
            }
        ]
    },

    resolve: {
        extensions: ['.ts', '.js']
    },

    optimization: {
        splitChunks: {
            cacheGroups: {
                jsVendors: {
                    test: isJsVendor,
                    name: 'vendors',
                    chunks: 'all'
                }
            }
        }
    },

    devtool: 'source-map',

    plugins: (function () {
        const plugins = [
            new CleanWebpackPlugin(
                ['dist/*.*'],
                {
                    root: path.resolve(__dirname),
                    verbose: true,
                    exclude: ['.gitkeep']
                }
            )];
        if (mode === 'production') {
            plugins.push(new UnminifiedWebpackPlugin());
        }

        return plugins;
    })()
});

function isJsVendor({resource}) {
    return resource &&
        resource.indexOf('node_modules') >= 0 &&
        resource.match(/.js$/);
}
