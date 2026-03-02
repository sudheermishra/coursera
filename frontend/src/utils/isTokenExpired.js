export async function isTokenExpired(tokenTimestamp) {
  const currentTimestamp = Math.floor(Date.now() / 1000);
  return currentTimestamp > tokenTimestamp;
}
