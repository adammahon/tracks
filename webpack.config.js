module.exports = {
    entry: './frontend/main.ts',
    output: {
        filename: 'main.js',
        path: `${__dirname}/dist/frontend`
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js']
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            }
        ]
    }
};
