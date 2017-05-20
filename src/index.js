// Hot module replacement
if (module.hot) {module.hot.accept();}

// Load webfont
const WebFont = require("webfontloader")
const WebFontConfig = {typekit: {id: 'ghu1owe'}}
WebFont.load(WebFontConfig);

// Load app
import Modernizr from 'modernizr'
if(NODE_ENV == 'development') require('./demo');
require('./polyfills');
import './app'
