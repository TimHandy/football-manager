let webpack = require('webpack')

module.exports = {

    devtool: 'eval-source-map',

    // define entry points (i.e. the first js file that 'requires' other files, this is the one that gets the other .js files started, i.e. links to them)

    entry: './app.js',         // don't forget the comma! It's an object remember.


    // define output points

    output: {
        path: 'dist',				// dir will get created automatically. Have also seen this used:  path: __dirname + '/dist',
        filename: './bundle.js'		// call it whatever you want. The index.html file should have it's script tag for the js pointing to this file. e.g.  <script src="./dist/bundle.js"></script>
        // you may see this also called something like scripts.min.js so name it that if you want.
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel',
                query: {
                    presets: ['es2015']
                }
            }
        ]
    }
}
