import directory from '@/data/site-directory.json';
import {articles,articleHref,sites} from '@/lib/content';

export function SiteDirectory(){return <>
 <p className="lead">気になるサイトの料金・条件、紹介されている根拠を探す。おすすめ3サイトと、他サイトに関する検証をまとめました。</p>
 <nav className="filters" aria-label="サイト一覧の分類"><a href="#recommended">おすすめ3サイト</a><a href="#investigated">他サイトの検証（{directory.length}件）</a></nav>
 <section id="recommended"><h2>編集部のおすすめ3サイト</h2><p>SHIVA・RIDEX・NEROの公開料金・プラン・利用条件を比較できます。おすすめ枠への掲載は、利益や的中率の保証ではありません。</p><div className="directory-grid">{sites.map(s=><article className="directory-card" key={s.slug}><img className="directory-logo" style={{background:s.logoBackground,borderRadius:12,padding:12}} src={s.logo} alt={`${s.name}のロゴ`} loading="lazy"/><h3>{s.name}</h3><p>公開料金・プラン・利用条件</p><a className="text-link" href={`/sites/${s.slug}/`}>料金・条件を確認 →</a><a href={`/check/${s.slug}/`}>検証記事へ →</a></article>)}</div></section>
 <section id="investigated"><h2>他サイトに関する検証</h2><p>販売サイト自身の調査と、紹介メディア・発信者の調査は対象が異なります。各項目に確認範囲を示しています。</p><div className="directory-grid">{directory.map(s=>{const reports=s.articles.map(slug=>articles.find(a=>a.slug===slug)!);return <article className="directory-card" id={s.slug} key={s.slug}><span className="reference-pill">{s.scope}</span><h3>{s.name}</h3><p>{s.summary}</p><ul>{reports.map(a=><li key={a.slug}><a href={articleHref(a)}>{a.title} →</a><small>記事の資料確認記録：{a.checkedAt}</small></li>)}</ul></article>})}</div></section>
 <section className="notice"><h2>調査範囲を順次拡大</h2><p>料金・利用規約・販売者情報・掲載実績・紹介関係を照合し、確認できた内容から追加します。上の一覧は検証済み記事への索引です。販売サイトの全項目を調査済み、または営業中と認定するものではありません。</p><a href="/media/">発信者・紹介メディアの検証を読む →</a></section>
 </>}
