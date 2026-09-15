import { createRequestHandler } from '@remix-run/cloudflare';
import * as build from './build/server';

const handleRemixRequest = createRequestHandler(build);

export default {
  async fetch(request, env, ctx) {
    try {
      return await handleRemixRequest(request, {
        cloudflare: { env, ctx },
      });
    } catch (error) {
      console.error(error);
      return new Response('An unexpected error occurred', { status: 500 });
    }
  },
};
