import assert from 'node:assert/strict';
import {existsSync,readFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
import {articles,sites,search,articleHref,relatedArticles} from '../lib/content.ts';
import {validateSettings} from '../lib/settings.ts';
assert.equal(new Set(articles.map(articleHref)).size,articles.length);
assert.equal(articles.length,28);
assert(articles.every(a=>a.status==='reviewed'));
const journal=articles.filter(a=>['news','column'].includes(a.category));
assert.equal(journal.length,11);
assert.equal(new Set(journal.map(a=>a.image)).size,journal.length);
for(const a of journal){assert(a.sections.length>=4);assert(!a.image.includes('category-'));for(const s of a.sections)if(s.table)assert(s.table.rows.every(row=>row.length===s.table.headers.length));}
assert.equal(30000-12000-10000,8000);
assert.equal(30000+60000-10000-30000-5000,45000);
assert.equal(search('ＲＩＤＥＸ')[0].slug,'ridex');
assert.equal(search('らいでっくす')[0].slug,'ridex');
assert(search('RIDEX 登録').length>0);
assert.equal(search('存在しない語句').length,0);
assert.equal(search('RIDEX','news').length,0);
assert.equal(search('   ').length,articles.length);
assert.throws(()=>validateSettings({SITE_PUBLISHED:'true'}));
assert.throws(()=>validateSettings({SITE_URL:'javascript:alert(1)'}));
assert.throws(()=>validateSettings({SITE_URL:'https://user:password@example.com'}));
assert.equal(validateSettings({}).live,false);
for(const a of articles){
 assert(a.title&&a.summary&&a.sections.length&&a.alt);
 assert(existsSync(`public${a.image}`));
 assert(['draft','review','reviewed'].includes(a.status));
 if(a.source) assert.equal(new URL(a.source.url).protocol,'https:');
 if(a.category==='news')assert(a.source&&/^\d{4}-\d{2}-\d{2}$/.test(a.date));
 assert(['check','news','column','guide','media'].includes(a.category));
 for(const source of a.sources??[])assert.equal(new URL(source.url).protocol,'https:');
 for(const evidence of a.evidence??[]){
  assert(evidence.id&&evidence.alt&&evidence.caption&&evidence.rightsBasis);
  if(evidence.afterHeading)assert.equal(a.sections.filter(s=>s.heading===evidence.afterHeading).length,1,'証拠画像の配置先見出しは一意に存在する');
  assert.equal(new URL(evidence.sourcePageUrl).protocol,'https:');
  assert(/^\d{4}-\d{2}-\d{2}$/.test(evidence.capturedAt));
  assert(evidence.publicFile.startsWith('/images/')&&!evidence.publicFile.includes('..'));
  assert(existsSync(`public${evidence.publicFile}`));
 }
 assert.equal(new Set((a.evidence??[]).map(e=>e.id)).size,a.evidence?.length??0);
 for(const correction of a.corrections??[])assert(correction.date&&correction.reason&&correction.before&&correction.after);
 if(a.metrics){assert(a.metrics.period&&Number.isInteger(a.metrics.sampleSize)&&a.metrics.sampleSize>0);for(const k of ['stakeYen','payoutYen','informationFeeYen'])assert(Number.isSafeInteger(a.metrics[k])&&a.metrics[k]>=0);}
 const related=relatedArticles(a);assert(related.every(b=>b.status==='reviewed'&&b.slug!==a.slug));assert.equal(new Set(related.map(b=>b.slug)).size,related.length);
}
assert.equal(articles.find(a=>a.slug==='ticket-screen').evidence.length,2);
assert(articles.some(a=>a.category==='guide'));
assert(articles.some(a=>a.category==='media'));
assert.deepEqual(sites.map(s=>s.slug),['shiva','ridex','nero']);
console.log(`PASS: ${articles.length}記事・出典・画像・検索・証拠・訂正履歴・関連記事・公開設定`);

for(const site of sites){assert.equal(new URL(site.url).protocol,"https:");assert(existsSync(`public${site.logo}`));assert(existsSync(`public${site.screen}`));assert(site.visualNote);}

for(const site of sites){assert.equal(site.review.slug,site.slug);assert.equal(site.review.checkedAt,'2026-11-22');for(const f of [...site.review.facts,...site.review.operator])assert.equal(new URL(f.source).protocol,'https:');for(const p of site.review.plans)assert(p.points===null||(Number.isSafeInteger(p.points)&&p.points>0));}
assert.equal(sites.find(s=>s.slug==='shiva').review.plans.length,12);
assert.equal(sites.find(s=>s.slug==='ridex').review.plans.length,15);
assert(sites.find(s=>s.slug==='nero').review.plans.every(p=>p.points===null));

for(const a of journal){if(a.photo){assert.equal(a.photo.image,a.image);assert(a.photo.caption&&a.photo.author);assert.equal(new URL(a.photo.source).protocol,"https:");assert.equal(new URL(a.photo.licenseUrl).hostname,"creativecommons.org");}for(const s of a.sections)if(s.illustration)assert(existsSync(`public${s.illustration.image}`));}

const promoters=articles.find(a=>a.slug==="paid-prediction-promoter-connections");
assert.equal(promoters.sections[0].table.rows.length,5);
assert.equal(promoters.evidence.length,3);
assert(search("チャーリー").some(a=>a.slug===promoters.slug));

const teams=articles.find(a=>a.slug==="paid-promoter-teams-and-contact");
assert.equal(teams.evidence.length,3);
assert.equal(teams.sections[4].table.rows.length,5);
assert(search("キャメロン").some(a=>a.slug===teams.slug));

const arithmetic=JSON.parse((await import('node:fs')).readFileSync('data/promoter-arithmetic.json','utf8'));
const amount=s=>Number(s.replace(/[^0-9]/g,''));
assert.equal(arithmetic.freeRows.length,13);
assert.equal(arithmetic.paidRows.length,13);
assert.equal(arithmetic.freeRows.reduce((n,r)=>n+amount(r[3])-amount(r[2]),0),85400);
assert.equal(arithmetic.paidRows.reduce((n,r)=>n+amount(r[5])-amount(r[3])-amount(r[4]),0),8384080);
assert.equal(arithmetic.comparisonRows.length,5);
assert(arithmetic.comparisonRows.every(r=>r[1]-r[2]===r[3]));

const heroImages=[...readFileSync('components/Hero.tsx','utf8').matchAll(/image:'([^']+)'/g)].map(m=>m[1]);
assert.equal(heroImages.length,3);
assert.equal(new Set(heroImages.map(path=>createHash('sha256').update(readFileSync('public'+path)).digest('hex'))).size,3,'トップの3枚は別の画像を使う');

const insight=JSON.parse(readFileSync('data/insight-arithmetic.json','utf8'));
const roundedReturn=(payout,investment)=>Math.round(payout/investment*1000)/10;
assert.equal(roundedReturn(insight.payoutYen,insight.investmentYen),504.3);
assert.equal(roundedReturn(insight.payoutYen,insight.comparisonDenominatorYen),insight.reportedReturnPercent);
assert.equal(insight.payoutYen-insight.investmentYen,insight.reportedProfitYen);
assert.equal(roundedReturn(insight.control.payoutYen,insight.control.investmentYen),insight.control.reportedReturnPercent);

// Current source-table arithmetic for the two Kaitaishinsho reviews.
const rate=(wins,total)=>Math.round(wins/total*1000)/10;
assert.equal(rate(4,6),66.7);assert.equal(rate(6,10),60);assert.equal(rate(106,154),68.8);
const clearRows=articles.find(a=>a.slug==='clear-racer-kaitaishinsho-evidence-audit').sections[2].table.rows;
const clearPayouts=clearRows.slice(0,5).map(r=>amount(r[2]));
assert.equal(clearPayouts.reduce((a,b)=>a+b,0),1884120);
assert.equal(17000+30000+60000+30000+80000,217000);
assert.equal(1884120-217000,1667120);assert.equal(rate(1107140,1884120),58.8);
assert.equal(articles.find(a=>a.slug==='trillion-kaitaishinsho-rate-audit').sections[1].table.rows[2][3],'68.8％');

const directory=JSON.parse(readFileSync('data/site-directory.json','utf8'));
assert.equal(new Set(directory.map(s=>s.slug)).size,directory.length);
for(const site of directory){assert(site.articles.length>0);for(const slug of site.articles)assert(articles.some(a=>a.slug===slug&&a.status==='reviewed'),`Missing reviewed report: ${slug}`);}

assert.equal(3500*100,350000);
for(const slug of ['spark-price-terms-audit','mega-dream-price-terms-audit']){const a=articles.find(a=>a.slug===slug);assert.equal(a.category,'check');assert(a.evidence.length>=2);assert(search(a.title.split('、')[0].split('の')[0]).some(hit=>hit.slug===slug));}

for(const a of articles)if(a.titleParts)assert.equal(a.titleParts.join(''),a.title,'見出しの改行用区分はタイトル本文と一致する');
