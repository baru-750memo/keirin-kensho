
import {articleHref,categories,statusLabels,type Article} from '@/lib/content';
export function Cards({items}:{items:Article[]}){return <div className="cards">{items.map(a=><article className="card" key={a.slug}><a href={articleHref(a)}><div className="card-image"><img className={a.photo?"editorial-photo":""} src={a.image} alt={a.alt} loading="lazy" width="640" height="360"/><span className={`tag ${a.category}`}>{categories[a.category]}</span></div><div className="card-copy">{a.photo&&<small className="photo-label">資料写真 ／ 撮影年は記事内に記載</small>}<span className="eyebrow">{statusLabels[a.status]}</span><h3>{a.title}</h3><p>{a.summary}</p><span className="text-link">読む <span>↗</span></span></div></a></article>)}</div>}

