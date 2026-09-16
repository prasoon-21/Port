// Polyfill process and process.env for Cloudflare Pages runtime
if (typeof globalThis.process === 'undefined') {
  globalThis.process = { env: { NODE_ENV: 'production' } };
} else if (!globalThis.process.env) {
  globalThis.process.env = { NODE_ENV: 'production' };
}
