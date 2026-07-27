import { readdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const base = process.env.VITE_BASE_PATH || '/taoan-mengyi-exhibition/';
const assetsDir = join('dist', 'assets');

for (const name of readdirSync(assetsDir)) {
  if (!/\.(js|css)$/.test(name)) continue;

  const file = join(assetsDir, name);
  let text = await import('node:fs').then(({ readFileSync }) => readFileSync(file, 'utf8'));

  text = text
    .replaceAll("url('/images/", `url('${base}images/`)
    .replaceAll('url("/images/', `url("${base}images/`)
    .replaceAll('url(/images/', `url(${base}images/`)
    .replaceAll("'/images/", `'${base}images/`)
    .replaceAll('"/images/', `"${base}images/`)
    .replaceAll("url('/zhang-dai-hero.png", `url('${base}zhang-dai-hero.png`)
    .replaceAll('url("/zhang-dai-hero.png', `url("${base}zhang-dai-hero.png`)
    .replaceAll('url(/zhang-dai-hero.png', `url(${base}zhang-dai-hero.png`)
    .replaceAll("'/zhang-dai-hero.png", `'${base}zhang-dai-hero.png`)
    .replaceAll('"/zhang-dai-hero.png', `"${base}zhang-dai-hero.png`);

  writeFileSync(file, text);
}

writeFileSync(join('dist', '.nojekyll'), '');
