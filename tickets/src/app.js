"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("express-async-errors");
var express_1 = __importStar(require("express"));
var cookie_session_1 = __importDefault(require("cookie-session"));
var helmet_1 = __importDefault(require("helmet"));
var common_1 = require("@omrilevyorg/common");
var new_ticket_1 = __importDefault(require("./routes/new-ticket"));
var show_ticket_1 = __importDefault(require("./routes/show-ticket"));
var routes_1 = __importDefault(require("./routes"));
var update_ticket_1 = __importDefault(require("./routes/update-ticket"));
// app was made in a separate file and not in index.tsx due to supertest and
// to avoid app.listen port already in use conflicts, and, also makes concurrent
// tests possible.
var app = express_1.default();
// due to ingress nginx
app.set("trust proxy", true);
app.use(helmet_1.default());
app.use(express_1.json());
app.use(cookie_session_1.default({
    signed: false,
    secure: process.env.NODE_ENV !== "test",
}));
app.use(common_1.currentUser);
app.use(new_ticket_1.default);
app.use(show_ticket_1.default);
app.use(routes_1.default);
app.use(update_ticket_1.default);
// catches 404 response error/non-existent route
app.all("*", function () {
    throw new common_1.NotFoundError("Route");
});
app.use(common_1.errorHandler);
exports.default = app;
