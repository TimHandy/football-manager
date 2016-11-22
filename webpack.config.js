let path = require('path')  // use path here and below in path.join as it's a safe way to use file paths to allow for / or \ depending on which OS the app will run on.
let HtmlWebpackPlugin = require('html-webpack-plugin')
let FaviconsWebpackPlugin = require('favicons-webpack-plugin')

module.exports = {

    // define entry points (i.e. the first js file that 'requires' other files, this is the one that gets the other .js files started, i.e. links to them)
    entry: path.join(__dirname, 'src', 'app.js'), 

    // define output points
    output: {
        path: path.join(__dirname, 'build'),
        filename: 'bundle.js'		
    },
    
    devtool: 'eval-source-map',

    module: {
        loaders: [
            {
                test: /\.js$/,
                include: path.join(__dirname, 'src'),
                loader: 'babel-loader',
                query: {
                    presets: ['es2015']
                },
                plugins: [
                    'transform-runtime' // the 'transform-runtime' plugin tells babel to require the runtime instead of inlining it.  npm i -D babel-plugin-transform-runtime  and  npm i -S babel-runtime
                ]
            },
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader',
                include: path.join(__dirname, 'src')
            }
        ]
    },
    devServer: {    // npm i -D webpack-dev-server
        contentBase: path.join(__dirname, 'build'),
        inline: true    // removes the iframe around the webpage
    },
    plugins: [
        new HtmlWebpackPlugin({ // npm i -D html-webpack-plugin
            template: path.join(__dirname, 'src', 'index.html')
        }),
        new FaviconsWebpackPlugin(path.join(__dirname, 'src', 'football-soccer-ball-152-183228.png'))
    ]
}
