"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Server Setup
var express_1 = __importDefault(require("express"));
var app = express_1.default();
var body_parser_1 = __importDefault(require("body-parser"));
var cors_1 = __importDefault(require("cors"));
var PORT = process.env.PORT || 3005;
// Middleware
app.use(cors_1.default());
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
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
