import { execFileSync } from 'node:child_process';

const files = ['assets/index-C5qta5dj.js', 'assets/index-CyJZ8OlC.css'];
const patterns = [
  '/images/',
  '"/images/',
  "'/images/",
  '/zhang-dai-hero.png',
  '/taoan-mengyi-exhibition/images/',
  '/taoan-mengyi-exhibition/zhang-dai-hero.png',
];

for (const file of files) {
  const text = execFileSync('git', ['show', `gh-pages:${file}`], { encoding: 'utf8' });
  console.log(file);
  for (const pattern of patterns) {
    console.log(pattern, text.split(pattern).length - 1);
  }
}
