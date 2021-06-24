"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var supertest_1 = __importDefault(require("supertest"));
var common_1 = require("@omrilevyorg/common");
var app_1 = __importDefault(require("../../app"));
var routeFound_1 = __importDefault(require("./utils/functions/routeFound"));
var genFakeMongoId_1 = __importDefault(require("./utils/functions/genFakeMongoId"));
var constants_1 = require("./utils/constants");
var createTicket_1 = __importDefault(require("./utils/functions/createTicket"));
var nats_wrapper_1 = require("../../nats-wrapper");
var Ticket_1 = __importDefault(require("../../models/Ticket"));
describe("update ticket", function () {
    var id = genFakeMongoId_1.default();
    var cookie = global.fakeAuth();
    it("has a route handler listening to api/tickets/:id for patch requests", function () { return __awaiter(void 0, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, supertest_1.default(app_1.default).patch("/api/tickets/" + id).send()];
                case 1:
                    res = _a.sent();
                    expect(routeFound_1.default(res.body)).toBe(true);
                    return [2 /*return*/];
            }
        });
    }); });
    it("returns a 404 response status code if the provided id does not exist", function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, supertest_1.default(app_1.default)
                        .patch("/api/tickets/" + id)
                        .set("Cookie", cookie)
                        .send(constants_1.testTicket)];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it("returns a 401 response status code if the user is not authenticated", function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, supertest_1.default(app_1.default).patch("/api/tickets/" + id).send(constants_1.testTicket).expect(401)];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it("returns a 401 response status code if the user does not own the ticket", function () { return __awaiter(void 0, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, createTicket_1.default()];
                case 1:
                    res = _a.sent();
                    return [4 /*yield*/, supertest_1.default(app_1.default)
                            .patch("/api/tickets/" + res.body.id)
                            .set("Cookie", cookie)
                            .send({
                            title: "new test title",
                            price: 25,
                        })
                            .expect(401)];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it("returns a 400 response status code if the user provides an invalid title", function () { return __awaiter(void 0, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, supertest_1.default(app_1.default)
                        .post("/api/tickets")
                        .set("Cookie", cookie)
                        .send(constants_1.testTicket)];
                case 1:
                    res = _a.sent();
                    return [4 /*yield*/, supertest_1.default(app_1.default)
                            .patch("/api/tickets/" + res.body.id)
                            .set("Cookie", cookie)
                            .send({
                            title: "",
                            price: 25,
                        })
                            .expect(400)];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, supertest_1.default(app_1.default)
                            .patch("/api/tickets/" + res.body.id)
                            .set("Cookie", cookie)
                            .send({
                            price: 25,
                        })
                            .expect(400)];
                case 3:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it("returns a 400 response status code if the user provides an invalid price", function () { return __awaiter(void 0, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, supertest_1.default(app_1.default)
                        .post("/api/tickets")
                        .set("Cookie", cookie)
                        .send(constants_1.testTicket)];
                case 1:
                    res = _a.sent();
                    return [4 /*yield*/, supertest_1.default(app_1.default)
                            .patch("/api/tickets/" + res.body.id)
                            .set("Cookie", cookie)
                            .send({
                            title: "new test title",
                            price: -25,
                        })
                            .expect(400)];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, supertest_1.default(app_1.default)
                            .patch("/api/tickets/" + res.body.id)
                            .set("Cookie", cookie)
                            .send({
                            title: "new test title",
                        })
                            .expect(400)];
                case 3:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it("returns a 400 response status code if a ticket is reserved", function () { return __awaiter(void 0, void 0, void 0, function () {
        var ticket, reservedTicket;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, supertest_1.default(app_1.default)
                        .post("/api/tickets")
                        .set("Cookie", cookie)
                        .send(constants_1.testTicket)];
                case 1:
                    ticket = (_a.sent()).body;
                    return [4 /*yield*/, Ticket_1.default.findById(ticket.id)];
                case 2:
                    reservedTicket = _a.sent();
                    reservedTicket.set({ orderId: genFakeMongoId_1.default() });
                    return [4 /*yield*/, reservedTicket.save()];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, supertest_1.default(app_1.default)
                            .patch("/api/tickets/" + ticket.id)
                            .set("Cookie", cookie)
                            .send({
                            title: "new test title",
                            price: 25,
                        })
                            .expect(400)];
                case 4:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it("updates the ticket provided valid inputs", function () { return __awaiter(void 0, void 0, void 0, function () {
        var title, price, ticket, res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    title = "new test title";
                    price = 25;
                    return [4 /*yield*/, supertest_1.default(app_1.default)
                            .post("/api/tickets")
                            .set("Cookie", cookie)
                            .send(constants_1.testTicket)];
                case 1:
                    ticket = (_a.sent()).body;
                    return [4 /*yield*/, supertest_1.default(app_1.default)
                            .patch("/api/tickets/" + ticket.id)
                            .set("Cookie", cookie)
                            .send({
                            title: title,
                            price: price,
                        })
                            .expect(200)];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, supertest_1.default(app_1.default).get("/api/tickets/" + ticket.id).send()];
                case 3:
                    res = _a.sent();
                    expect(res.body.title).toBe(title);
                    expect(res.body.price).toBe(price);
                    return [2 /*return*/];
            }
        });
    }); });
    it("publishes a ticket updated event", function () { return __awaiter(void 0, void 0, void 0, function () {
        var ticket;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, supertest_1.default(app_1.default)
                        .post("/api/tickets")
                        .set("Cookie", cookie)
                        .send(constants_1.testTicket)];
                case 1:
                    ticket = (_a.sent()).body;
                    return [4 /*yield*/, supertest_1.default(app_1.default)
                            .patch("/api/tickets/" + ticket.id)
                            .set("Cookie", cookie)
                            .send({
                            title: "new test title",
                            price: 25,
                        })];
                case 2:
                    _a.sent();
                    expect(nats_wrapper_1.natsWrapper.stan.publish).toHaveBeenCalled();
                    expect(nats_wrapper_1.natsWrapper.stan.publish.mock.calls[1][0]).toBe(common_1.Subjects.TICKET_UPDATED);
                    return [2 /*return*/];
            }
        });
    }); });
});
