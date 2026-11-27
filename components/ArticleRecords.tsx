import type {Article,Evidence} from '@/lib/content';
export function ArticleRecords({article:a}:{article:Article}){return <>
 {a.metrics&&<section><h2>数字の集計条件</h2><dl>{Object.entries({対象期間:a.metrics.period,記録種別:{purchase_record:'実購入',simulation:'試算',published_aggregation:'掲載集計'}[a.metrics.basis],件数:a.metrics.sampleSize,車券代:a.metrics.stakeYen,払戻:a.metrics.payoutYen,情報料:a.metrics.informationFeeYen,不的中を含む:a.metrics.includesLosses?'はい':'いいえ'}).map(([key,value])=><div key={key}><dt>{key}</dt><dd>{value}</dd></div>)}</dl></section>}
 <EvidenceFigures items={(a.evidence??[]).filter(e=>!e.afterHeading)}/>
 {a.sources&&<section className="source"><h2>追加の確認資料</h2><ul>{a.sources.map(s=><li key={s.url}><a href={s.url} target="_blank" rel="noreferrer">{s.label} ↗</a></li>)}</ul></section>}
 <section className="correction-history"><h2>訂正・更新履歴</h2>{a.corrections?.length?<ol>{a.corrections.map((c,i)=><li key={`${c.date}-${i}`}><time>{c.date}</time><b>{c.reason}</b><p>変更前：{c.before}</p><p>変更後：{c.after}</p></li>)}</ol>:<p className="fine">掲載内容の訂正記録はありません。</p>}</section>
 </>}

export function EvidenceFigures({items}:{items:Evidence[]}){return <>{items.map(e=><figure key={e.id} className="record-figure"><div className="record-heading"><b>{e.caption}</b><a href={e.publicFile} target="_blank" rel="noreferrer">原寸で開く ↗</a></div><div className="evidence-scroll" tabIndex={0} role="region" aria-label={`${e.alt}。${e.publicFile.startsWith('/images/site-audits/')?'原寸で開くリンクから拡大できます':'横にスクロールして確認できます'}`}><img src={e.publicFile} alt={e.alt} loading="lazy"/></div></figure>)}</>}
