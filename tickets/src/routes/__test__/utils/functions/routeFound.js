"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// expects and destructures res.body.
var routeFound = function (_a) {
    var errors = _a.errors;
    // initialized as true in case there are no errors or the
    // forEach/isFound reassignment gets skipped for any reason.
    var isFound = true;
    // covers cases where there is more than one error or non-route related 404
    // response status.
    errors === null || errors === void 0 ? void 0 : errors.forEach(function (error) {
        if ((error === null || error === void 0 ? void 0 : error.message) === "Route not found.") {
            isFound = false;
        }
    });
    return isFound;
};
exports.default = routeFound;
