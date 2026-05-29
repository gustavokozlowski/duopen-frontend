// Access token lives only in memory — never in localStorage/sessionStorage.
// refresh_token is kept in an httpOnly cookie managed pelo servidor.

let accessToken: string | null = null;

export function getAccessToken(): string | null {
  return accessToken;
}

export function setAccessToken(token: string): void {
  accessToken = token;
}

export function clearAccessToken(): void {
  accessToken = null;
}
