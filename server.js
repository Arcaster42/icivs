"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
// Server Setup
var express_1 = __importDefault(require("express"));
var app = express_1.default();
var http = __importStar(require("http"));
var server = new http.Server(app);
var socketio = __importStar(require("socket.io"));
var body_parser_1 = __importDefault(require("body-parser"));
var cors_1 = __importDefault(require("cors"));
var PORT = process.env.PORT || 3005;
var PORT_WS = process.env.PORT_WS || 3006;
// Middleware
app.use(cors_1.default());
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
// Socket Server
var ws = socketio.listen(PORT_WS);
ws.on('connection', function (socket) {
    console.log('Client Connected');
    setInterval(function () {
        socket.send('USER');
    }, 60000);
    socket.on('message', function (msg) {
    });
});
// Routes
var auth_1 = __importDefault(require("./server/routes/auth"));
var game_1 = __importDefault(require("./server/routes/game"));
// Game Cycle
var cycle_1 = require("./server/cycle");
setInterval(cycle_1.gameCycle, 60000);
app.use('/user', auth_1.default);
app.use('/game', game_1.default);
// Add IP for mobile testing
app.listen(PORT, function () { return console.log("Listening on " + PORT); });
