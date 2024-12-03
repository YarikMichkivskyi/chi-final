import path from 'path';
import { fileURLToPath } from 'url';
import HtmlWebpackPlugin from "html-webpack-plugin";
import webpack from 'webpack';
import dotenv from 'dotenv';
dotenv.config();


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default () => {

    const envPath = path.resolve(__dirname, '.env');
    const envVars = dotenv.config({ path: envPath }).parsed || {};

    console.log(envPath);

    return {
        entry: './src/index.tsx',
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: 'bundle.[contenthash].js',
            clean: true,
        },
        mode: 'development',
        module: {
            rules: [
                {
                    test: /\.(js|jsx|ts|tsx)$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: ["@babel/preset-env", "@babel/preset-react", "@babel/preset-typescript"]
                        }
                    },
                },
                {
                    test: /\.css$/i,
                    use: ['style-loader', 'css-loader'],
                },
            ],
        },
        resolve: {
            extensions: ['.js', '.jsx', '.ts', '.tsx'],
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: './public/index.html',
            }),
            new webpack.DefinePlugin({
                'process.env': JSON.stringify(envVars),
            }),
        ],
        devServer: {
            historyApiFallback: true,
            static: './dist',
            hot: true,
            open: true,
            port: 4567,
            // allowedHosts: [
            //     '.us-east-2.compute.amazonaws.com',
            //     'ec2-52-15-38-0.us-east-2.compute.amazonaws.com',//to .env
            //     'localhost',
            // ],
        },
    };
}