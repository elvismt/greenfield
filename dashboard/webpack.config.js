/* Copyright (C) 2017 Elvis Teixeira
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
"use strict";

const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlPlugin = require('html-webpack-plugin');

let extractTextPlugin = new ExtractTextPlugin({
    filename: 'bundle.css'
});

module.exports = {
    entry: './front/src/main.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.scss/,
                use: extractTextPlugin.extract({
                    use: ['css-loader', 'sass-loader']
                })
            },
            {
                test: /\.js/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: ['es2015', 'react']
                        }
                    }
                ]
            },
            {
                test: /\.html/,
                use: ['html-loader']
            }
        ]
    },
    plugins: [
        extractTextPlugin,
        new HtmlPlugin({
            template: './front/index.html'
        })
    ]
};
