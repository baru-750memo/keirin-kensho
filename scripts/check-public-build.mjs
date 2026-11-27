import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const read=path=>readFileSync(`.next/server/app/${path}`,'utf8');
assert(read('robots.txt.body').includes('Allow: /\n'));
assert(!read('robots.txt.body').includes('Disallow: /\n'));
const sitemap=read('sitemap.xml.body');
assert.equal((sitemap.match(/<loc>/g)||[]).length,37);
assert(!sitemap.includes('127.0.0.1'));
assert(read('index.html').includes('name="robots" content="index, follow"'));
assert(read('about.html').includes('href="https://lin.ee/5OeYxSk"'));
assert(read('about.html').includes('競輪検証編集部'));
assert(read('media/promoter-profit-claims-audit.html').includes('href="https://keirin-kensho.com/media/promoter-profit-claims-audit/"'));
console.log('PASS: public build indexing, 37 sitemap URLs, canonical and LINE contact');

assert(sitemap.includes('https://keirin-kensho.com/directory/'));
assert(read('directory.html').includes('クリアレーサー'));

for(const slug of ['spark-price-terms-audit','mega-dream-price-terms-audit']){assert(sitemap.includes(`/check/${slug}/`));assert(read(`check/${slug}.html`).includes('/images/site-audits/'));}
