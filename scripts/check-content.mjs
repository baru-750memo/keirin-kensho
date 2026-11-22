import assert from 'node:assert/strict';
import {existsSync} from 'node:fs';
import {articles,sites,search,articleHref,relatedArticles} from '../lib/content.ts';
import {validateSettings} from '../lib/settings.ts';
assert.equal(new Set(articles.map(articleHref)).size,articles.length);
assert.equal(articles.length,16);
assert(articles.every(a=>a.status==='reviewed'));
const journal=articles.filter(a=>['news','column'].includes(a.category));
assert.equal(journal.length,10);
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
