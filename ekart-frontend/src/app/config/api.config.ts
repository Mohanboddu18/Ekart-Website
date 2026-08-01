export function getApiBaseUrl(): string {
  if (typeof window !== 'undefined') {
    const hostname = window.location.hostname;
    // If running in browser on cloud/Render host or non-localhost
    if (hostname !== 'localhost' && hostname !== '127.0.0.1') {
      // Use window origin or relative API path when served behind proxy/cloud host
      return window.location.origin;
    }
  }
  return 'http://localhost:8080';
}
