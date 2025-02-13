"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.randomStr = randomStr;
function randomStr(len) {
    var allowedChars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890';
    var result = "";
    for (var i = 0; i < len; i++) {
        result += allowedChars[Math.floor(Math.random() * allowedChars.length)];
    }
    return result;
}
