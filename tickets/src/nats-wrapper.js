"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.natsWrapper = void 0;
var node_nats_streaming_1 = require("node-nats-streaming");
// used as a singleton to avoid circular imports
var NatsWrapper = /** @class */ (function () {
    function NatsWrapper() {
    }
    Object.defineProperty(NatsWrapper.prototype, "stan", {
        get: function () {
            if (!this._stan) {
                throw new Error("Cannot access NATS client before connecting.");
            }
            return this._stan;
        },
        enumerable: false,
        configurable: true
    });
    NatsWrapper.prototype.connect = function (clusterId, clientId, url) {
        var _this = this;
        this._stan = node_nats_streaming_1.connect(clusterId, clientId, { url: url });
        return new Promise(function (resolve, reject) {
            _this.stan.on("connect", function () {
                console.log("Connected to NATS.");
                resolve();
            });
            _this.stan.on("error", function (err) {
                reject(err);
            });
        });
    };
    return NatsWrapper;
}());
var natsWrapper = new NatsWrapper();
exports.natsWrapper = natsWrapper;
