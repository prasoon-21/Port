import './polyfill.js';
import { createPagesFunctionHandler } from '@remix-run/cloudflare-pages';
import * as build from '../build/server';

export const onRequest = createPagesFunctionHandler({
  build,
  getLoadContext: context => {
    if (context.env && typeof process !== 'undefined' && process.env) {
      Object.assign(process.env, context.env);
    }
    return {
      cloudflare: {
        env: context.env,
        cf: context.cf,
        ctx: context.ctx,
      },
    };
  },
});
