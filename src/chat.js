import io from 'socket.io-client';
import {sanitizeString, validNick} from './utils';

let connections = [];
let friends = [];

export default class chat {
    constructor(nick) {
        this.chatInput = document.getElementById('chatInput');
        this.chatList = document.getElementById('chatList');
        this.nick = nick;
        this.socket = io({query: "nick=" + nick});
        this.commands = {};

        this.setupSocket();
        this.setupChat();
        this.setupEvents();
    }

    setupSocket() {
        this.socket.on('dong', () => {
            this.latency = Date.now() - this.startPingTime;
            this.addSystemLine('Ping: ' + this.latency + 'ms');
        });

        this.socket.on('connect_failed', () => {
            this.socket.close();
        });

        this.socket.on('disconnect', () => {
            this.socket.close();
        });

        this.socket.on('userDisconnect', (data) => {
            connections.splice(connections.indexOf(data), 1);
            this.addSystemLine('<b>' + (data.nick.length < 1 ? 'Anon' : data.nick) + '</b> отключился');
        });

        this.socket.on('userJoin', (data) => {
            if(data.nick != this.nick) {
                connections.push(data);
                console.log(connections);
                this.addSystemLine('Зашел <b>' + (data.nick.length < 1 ? 'Anon' : data.nick) + '</b>');
            }
        });

        this.socket.on('serverSendUserChat', (data) => {
            this.addChatLine(data.nick, data.message, false);
        });
    }

    setupChat() {
        this.registerCommand('ping', 'Check your latency.', () => {
            this.checkLatency();
        });

        this.registerCommand('help', 'Information about the chat commands.', () => {
            this.printHelp();
        });

        this.addSystemLine('Добро пожаловать в чатик!');
    }

    setupEvents() {
        this.chatInput.addEventListener('keypress', (key) => {
            key = key.which || key.keyCode;
            if (key === 13) {
                this.sendChat(sanitizeString(this.chatInput.value));
                this.chatInput.value = '';
            }
        });

        this.chatInput.addEventListener('keyup', (key) => {
            key = key.which || key.keyCode;
            if (key === 27) {
                this.chatInput.value = '';
            }
        });
    }

    sendChat(text) {
        if (text) {
            if (text.indexOf('/') === 0) {
                let args = text.substring(1).split(' ');

                if (this.commands[args[0]]) {
                    this.commands[args[0]].callback(args.slice(1));
                } else {
                    this.addSystemLine('Unrecognized Command: ' + text + ', type /help for more info.');
                }

            } else {
                this.socket.emit('userChat', {nick: this.nick, message: text});
                this.addChatLine(this.nick, text, true);
            }
        }
    }

    addChatLine(name, message, me) {
        let newline = document.createElement('li'),
            newlineWrapper = document.createElement('span'),
            d = new Date(),
            datetext = d.toTimeString().split(' ')[0].slice(0, -3);

        newline.className = (me) ? 'me' : 'friend';
        newlineWrapper.innerHTML = (me) ? '' : '<b>' + ((name.length < 1) ? 'Anon' : name) + '</b>';
        newlineWrapper.innerHTML += message;
        newlineWrapper.innerHTML += '<i>' + datetext + '</i>';

        newline.appendChild(newlineWrapper);
        this.appendMessage(newline);
    }

    addSystemLine(message) {
        let newline = document.createElement('li');

        newline.className = 'system';
        newline.innerHTML = message;

        this.appendMessage(newline);
    }

    appendMessage(node) {
        if (this.chatList.childNodes.length > 10) {
            this.chatList.removeChild(this.chatList.childNodes[0]);
        }
        this.chatList.appendChild(node);
    };

    registerCommand(name, description, callback) {
        this.commands[name] = {
            description: description,
            callback: callback
        };
    };

    printHelp() {
        for (let cmd in this.commands) {
            if (this.commands.hasOwnProperty(cmd)) {
                this.addSystemLine('/' + cmd + ': ' + this.commands[cmd].description);
            }
        }
    };

    checkLatency() {
        this.startPingTime = Date.now();
        this.socket.emit('ding');
    }
}


function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}
 
class Client {
    constructor () {
        let btn = document.getElementById('startButton'),
            userNameInput = document.getElementById('userNameInput'),
            preset = getParameterByName('id');

        if(preset) {
            this.startChat(preset);
        }
        
        btn.onclick = () => {
            this.startChat(userNameInput.value);
        };

        userNameInput.addEventListener('keypress', (e) => {
            let key = e.which || e.keyCode;

            if (key === 13) {
                this.startChat(userNameInput.value);
            }
        });
    }

    startChat(nick) {
        let nickErrorText = document.querySelector('#startMenu .input-error');

        if (validNick(nick)) {
            nickErrorText.style.opacity = 0;
            this.nick = nick;
        } else {
            nickErrorText.style.opacity = 1;
            return false;
        }

        this.chat = new chat(this.nick);

        document.getElementById('app').classList.add('logged-in');
        document.getElementById('startMenu').style.display = 'none';
        document.getElementById('chatbox').style.display = 'block';
    }
}

window.onload = () => {
    new Client();
};