'use strict';

// Server setup
const express = require('express')
const http = require('http')
const bodyParser = require('body-parser')
const socketIO = require('socket.io')
const app = express()
const server = http.createServer(app)
const port = process.env.PORT || 3000;

const webpack = require('webpack')
const webpackMiddleWare = require('webpack-dev-middleware')
const webpackHotMiddleware=require('webpack-hot-middleware')
const webpackConfig = require('./webpack.config')
const webpackCompiler = webpack(webpackConfig)
app.use(webpackMiddleWare(webpackCompiler, {
    stats: {colors: true},
    publicPath: webpackConfig.output.publicPath
}))
app.use(webpackHotMiddleware(webpackCompiler))
	
app.use(express.static(__dirname + '/dist'))
app.use(bodyParser.urlencoded({extended:false}))
server.listen(port)


// Server app logic
const io = socketIO(server)
const utils = require('./src/utils')
let sockets = {}
let users = []

io.on('connection', (socket) => {
	'use strict';

    let nick = socket.handshake.query.nick;
    let currentUser = {
        id: socket.id,
        nick: nick
    };

    if (utils.findIndex(users, currentUser.id) > -1) {
        console.log('[INFO] User ID is already connected, kicking.');
        socket.disconnect();
    } else if (!utils.validNick(currentUser.nick)) {
        socket.disconnect();
    } else {
        console.log('[INFO] User ' + currentUser.nick + ' connected!');
        sockets[currentUser.id] = socket;
        users.push(currentUser);
        io.emit('userJoin', {nick: currentUser.nick});
        console.log('[INFO] Total users: ' + users.length);
    }

    socket.on('ding', () => {
        socket.emit('dong');
    });

    socket.on('disconnect', () => {
        if (utils.findIndex(users, currentUser.id) > -1) users.splice(utils.findIndex(users, currentUser.id), 1);
        console.log('[INFO] User ' + currentUser.nick + ' disconnected!');
        socket.broadcast.emit('userDisconnect', {nick: currentUser.nick});
    });

    socket.on('userChat', (data) => {
        let _nick = utils.sanitizeString(data.nick);
        let _message = utils.sanitizeString(data.message);
        let date = new Date();
        let time = ("0" + date.getHours()).slice(-2) + ("0" + date.getMinutes()).slice(-2);

        console.log('[CHAT] [' + time + '] ' + _nick + ': ' + _message);
        socket.broadcast.emit('serverSendUserChat', {nick: _nick, message: _message});
    });
});