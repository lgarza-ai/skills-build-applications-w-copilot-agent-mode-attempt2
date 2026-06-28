const codespaceName = process.env.CODESPACE_NAME?.trim();

export function getApiBaseUrl() {
  return codespaceName
    ? `https://${codespaceName}-8000.app.github.dev`
    : 'http://localhost:8000';
}
