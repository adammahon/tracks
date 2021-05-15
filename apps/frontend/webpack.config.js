/* eslint-disable */
const path = require('path');

module.exports = {
    mode: 'development',
    entry: [
        path.join(__dirname, 'index.html'),
        path.join(__dirname, 'main.ts')
    ],
    output: {
        filename: 'main.js',
        path: path.join(__dirname, '../../dist/apps/frontend/')
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js']
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'ts-loader',
                        options: {
                            configFile: 'tsconfig.app.json'
                        }
                    }
                ]
            },
            {
                test: /\.html/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]'
                        }
                    }
                ]
            }
        ]
    }
};
