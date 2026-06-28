export function getApiBaseUrl() {
  const envCodespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim();
  const currentHost = typeof window !== 'undefined' ? window.location.hostname : '';
  const inferredCodespaceName = currentHost.match(/^(?:(?:\d+)-)?(.+?)(?:-\d+)?\.app\.github\.dev$/)?.[1];

  const codespaceName = envCodespaceName || inferredCodespaceName;

  if (codespaceName) {
    return `https://${codespaceName}-8000.app.github.dev`;
  }

  return 'http://localhost:8000';
}

export function getApiUrl(endpointPath) {
  return `${getApiBaseUrl()}${endpointPath}`;
}
