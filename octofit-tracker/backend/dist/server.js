"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getApiBaseUrl = getApiBaseUrl;
const codespaceName = process.env.CODESPACE_NAME?.trim();
function getApiBaseUrl() {
    return codespaceName
        ? `https://${codespaceName}-8000.app.github.dev`
        : 'http://localhost:8000';
}
