import assert from 'node:assert/strict';
import {articles,articleHref,sites} from '../lib/content.ts';
const base='http://127.0.0.1:3110';
const routes=['/','/check/','/news/','/column/','/guide/','/media/','/sites/','/search/','/about/','/credits/',...articles.map(articleHref),...sites.map(s=>`/sites/${s.slug}/`)];
const images=new Set();
for(const path of routes){
 const r=await fetch(base+path);assert.equal(r.status,200,path);const html=await r.text();
 assert.match(html,/<h1[ >]/,path);assert.match(html,/noindex/,path);
 assert.match(html,/<link rel="canonical"/,path);
 for(const m of html.matchAll(/<img[^>]+src="([^"]+)"/g))images.add(m[1]);
 for(const m of html.matchAll(/<a[^>]+href="(\/[^"#?]*)/g))assert(routes.includes(m[1])||m[1].startsWith('/images/'),`Unknown link ${path} -> ${m[1]}`);
}
for(const image of images)assert.equal((await fetch(base+image)).status,200,image);
assert.equal((await fetch(base+'/sites/unknown/')).status,404);
assert.equal((await fetch(base+'/news/unknown/')).status,404);
assert.match(await(await fetch(base+'/robots.txt')).text(),/Disallow: \//);
assert(!/<loc>/.test(await(await fetch(base+'/sitemap.xml')).text()));
console.log(`PASS: ${routes.length} pages, ${images.size} images, canonical/noindex, links, unknown routes, robots/sitemap`);
