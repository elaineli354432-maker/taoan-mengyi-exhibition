import { mkdir, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

const worker = `const mimeTypes = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.json': 'application/json; charset=utf-8'
};

function contentType(pathname) {
  const match = pathname.match(/\\.[^.\\/]+$/);
  return match ? mimeTypes[match[0].toLowerCase()] || 'application/octet-stream' : 'text/html; charset=utf-8';
}

async function assetResponse(request, env, pathname) {
  const assetUrl = new URL(request.url);
  assetUrl.pathname = pathname;
  const response = await env.ASSETS.fetch(new Request(assetUrl, request));
  if (response.status !== 404) return response;
  return null;
}

async function firstAsset(request, env, pathnames) {
  for (const pathname of pathnames) {
    const response = await assetResponse(request, env, pathname);
    if (response) return response;
  }
  return null;
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const pathname = url.pathname === '/' ? '/index.html' : url.pathname;
    const asset = await firstAsset(request, env, [pathname, '/dist' + pathname]);
    if (asset) {
      const headers = new Headers(asset.headers);
      headers.set('content-type', headers.get('content-type') || contentType(pathname));
      return new Response(asset.body, { status: asset.status, headers });
    }

    const fallback = await firstAsset(request, env, ['/index.html', '/dist/index.html']);
    if (fallback) {
      const headers = new Headers(fallback.headers);
      headers.set('content-type', 'text/html; charset=utf-8');
      return new Response(fallback.body, { status: 200, headers });
    }

    return new Response('Not found', { status: 404 });
  }
};
`;

await mkdir(join('dist', 'server'), { recursive: true });
await writeFile(join('dist', 'server', 'index.js'), worker);
