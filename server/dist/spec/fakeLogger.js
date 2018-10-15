"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class FakeLogger {
    constructor() {
        this._lastError = null;
    }
    get lastError() {
        return this._lastError;
    }
    error(error) {
        this._lastError = error;
    }
    clearErrorLog() {
        this._lastError = null;
    }
}
exports.FakeLogger = FakeLogger;