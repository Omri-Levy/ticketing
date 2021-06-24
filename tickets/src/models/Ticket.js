"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var mongoose_update_if_current_1 = require("mongoose-update-if-current");
var ticketSchema = new mongoose_1.default.Schema({
    title: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    userId: {
        type: String,
        required: true,
    },
    orderId: {
        type: String,
    },
}, {
    toJSON: {
        transform: function (doc, ret) {
            /* eslint no-underscore-dangle: "off" */
            /* eslint no-param-reassign: "off" */
            ret.id = ret._id;
            delete ret._id;
        },
    },
});
ticketSchema.set("versionKey", "version");
ticketSchema.plugin(mongoose_update_if_current_1.updateIfCurrentPlugin);
ticketSchema.statics.build = function (attrs) {
    return new Ticket(attrs);
};
var Ticket = mongoose_1.default.model("Ticket", ticketSchema);
exports.default = Ticket;
