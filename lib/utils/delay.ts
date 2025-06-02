export async function delay(ms: number) {
  console.log(`⏳ Delaying for ${ms}ms...`);
  return new Promise((resolve) => setTimeout(resolve, ms));
}
