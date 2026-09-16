if (typeof globalThis.process === 'undefined') {
  globalThis.process = { env: { NODE_ENV: 'production' } };
} else if (!globalThis.process.env) {
  globalThis.process.env = { NODE_ENV: 'production' };
}

import * as ReactDOMServer from 'react-dom/server';
import { RemixServer } from '@remix-run/react';
import { isbot } from 'isbot';

const ABORT_DELAY = 5000;

export default async function handleRequest(
  request,
  responseStatusCode,
  responseHeaders,
  remixContext
) {
  if (typeof ReactDOMServer.renderToReadableStream === 'function') {
    return handleEdgeRequest(
      request,
      responseStatusCode,
      responseHeaders,
      remixContext
    );
  } else {
    return handleNodeRequest(
      request,
      responseStatusCode,
      responseHeaders,
      remixContext
    );
  }
}

async function handleEdgeRequest(
  request,
  responseStatusCode,
  responseHeaders,
  remixContext
) {
  const userAgent = request.headers.get('user-agent');
  const body = await ReactDOMServer.renderToReadableStream(
    <RemixServer context={remixContext} url={request.url} />,
    {
      signal: request.signal,
      onError(error) {
        console.error(error);
        responseStatusCode = 500;
      },
    }
  );

  if (isbot(userAgent)) {
    await body.allReady;
  }

  responseHeaders.set('Content-Type', 'text/html');
  return new Response(body, {
    headers: responseHeaders,
    status: responseStatusCode,
  });
}

async function handleNodeRequest(
  request,
  responseStatusCode,
  responseHeaders,
  remixContext
) {
  const { PassThrough, Readable } = await import('node:stream');
  const userAgent = request.headers.get('user-agent');
  const isBotUser = isbot(userAgent);

  return new Promise((resolve, reject) => {
    let shellRendered = false;
    const { pipe, abort } = ReactDOMServer.renderToPipeableStream(
      <RemixServer context={remixContext} url={request.url} />,
      {
        [isBotUser ? 'onAllReady' : 'onShellReady']() {
          shellRendered = true;
          const body = new PassThrough();
          const stream = Readable.toWeb(body);

          responseHeaders.set('Content-Type', 'text/html');

          resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode,
            })
          );

          pipe(body);
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500;
          if (shellRendered) {
            console.error(error);
          }
        },
      }
    );

    setTimeout(abort, ABORT_DELAY);
  });
}
