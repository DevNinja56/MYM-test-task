const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");
const HtmlPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const tailwindcss = require("tailwindcss");
const autoprefixer = require("autoprefixer");
const webpack = require("webpack");

module.exports = {
  entry: {
    popup: path.resolve("src/popup/index.tsx"),
    background: path.resolve("src/background/index.ts"),
    contentScript: path.resolve("src/contentScript/index.ts"),
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "build"),
  },
  module: {
    rules: [
      {
        use: "ts-loader",
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
      },
      {
        use: [
          "style-loader",
          "css-loader",
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                ident: "postcss",
                plugins: [tailwindcss, autoprefixer],
              },
            },
          },
        ],
        test: /\.(css)$/i,
      },
      {
        type: "assets/resource",
        test: /\.(png|jpg|jpeg|gif|woff|woff2|tff|eot|svg)$/,
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
    alias: {
      "@components": path.resolve(__dirname, "src/popup/components/"),
      "@assets": path.resolve(__dirname, "src/assets/"),
      "@constants": path.resolve(__dirname, "src/popup/constants/"),
      "@contexts": path.resolve(__dirname, "src/popup/contexts/"),
      "@pages": path.resolve(__dirname, "src/popup/pages/"),
      "@layout": path.resolve(__dirname, "src/popup/layout/"),
      "@api": path.resolve(__dirname, "src/popup/api/"),
      "@enums": path.resolve(__dirname, "src/popup/enums/"),
      "@routes": path.resolve(__dirname, "src/popup/routes/"),
      "@interfaces": path.resolve(__dirname, "src/popup/interfaces/"),
    },
  },
  plugins: [
    new CleanWebpackPlugin({
      cleanStaleWebpackAssets: false,
    }),
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve("src/static/manifest.json"),
          to: path.resolve("build"),
        },
        { from: path.resolve("src/static"), to: path.resolve("build/assets") },
      ],
    }),
    ...getHtmlPlugins(["popup"]),
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify("development"),
      },
    }),
  ],
  optimization: {
    splitChunks: {
      chunks(chunk) {
        return chunk.name !== "contentScript";
      },
    },
  },
};

function getHtmlPlugins(chunks) {
  return chunks.map(
    (chunk) =>
      new HtmlPlugin({
        title: "Test Task",
        filename: `${chunk}.html`,
        chunks: [chunk],
      })
  );
}
