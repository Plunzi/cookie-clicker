export function pickRandomCookie (cookies: { name: string }[]): string {
  const randomCoookie = cookies[Math.floor(Math.random() * cookies.length)]
  return randomCoookie.name.toLowerCase();
}