const path = require("path");
const PugPlugin = require('pug-plugin');

const mode = process.env.NODE_ENV || "development" ;
const devMode = mode === "development";
const target = devMode ? "web" : "browserslist";
const devtool = devMode ? "source-map" : undefined;