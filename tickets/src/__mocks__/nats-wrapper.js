"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.natsWrapper = void 0;
var natsWrapper = {
    stan: {
        publish: jest
            .fn()
            .mockImplementation(function (subject, data, callback) {
            callback();
        }),
    },
};
exports.natsWrapper = natsWrapper;
