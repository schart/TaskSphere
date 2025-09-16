export function extractToken(headers: string) {
  return headers.split(' ')[1];
}
