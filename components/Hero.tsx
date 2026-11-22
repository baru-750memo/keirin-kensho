'use client';
import {useState} from 'react';
const slides=[
 {tag:'特集 / KEIRIN RESEARCH',title:['競輪の実態を、','データで読み解く。'],text:'予想サイトの掲載実績・料金・口コミ。\n根拠から見える情報を届けます。',href:'/check/',image:'/images/hero.webp',label:'検証記事を見る'},
 {tag:'調査レポート / EVIDENCE',title:['その的中実績、','条件まで見た？'],text:'払戻額と利益は違う。\n車券代・情報料を含めて確認。',href:'/column/return-and-profit/',image:'/images/article-evidence.webp',label:'調査内容を見る'},
 {tag:'競輪コラム / JOURNAL',title:['知るほど、','レースが面白い。'],text:'レースの見方を公式ガイドから。\n気になることをひとつずつ。',href:'/column/official-guide/',image:'/images/race.jpg',label:'コラムを見る'},
];
export function Hero(){const[i,setI]=useState(0);const s=slides[i];return <section className="hero" aria-roledescription="カルーセル" aria-label="注目特集"><div className="hero-stage"><img className="hero-image" src={s.image} alt="" fetchPriority="high"/><span className="image-note">写真は試作用ビジュアル</span><div className="hero-copy" aria-live="polite"><span className="hero-tag">{s.tag}</span><h1>{s.title.map(line=><span key={line}>{line}</span>)}</h1><p>{s.text}</p><a className="hero-link" href={s.href}>{s.label}<span aria-hidden="true">›</span></a></div></div><div className="hero-controls"><div className="dots">{slides.map((s,n)=><button key={s.tag} aria-label={`特集${n+1}：${s.label}`} aria-current={n===i?'true':undefined} onClick={()=>setI(n)}><span/></button>)}</div><div className="arrows"><button aria-label="前の特集" onClick={()=>setI((i+2)%3)}>‹</button><button aria-label="次の特集" onClick={()=>setI((i+1)%3)}>›</button></div></div></section>}
