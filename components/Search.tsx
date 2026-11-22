'use client';
import {useEffect,useState} from 'react';

import {search,categories,articleHref,statusLabels} from '@/lib/content';
export function Search(){const[q,setQ]=useState('');const[cat,setCat]=useState('all');useEffect(()=>{setQ(new URLSearchParams(location.search).get('q')??'')},[]);const hits=search(q,cat);return <><label className="search-label" htmlFor="query">記事・サイト名を検索</label><input className="query" id="query" type="search" value={q} onChange={e=>setQ(e.target.value)} placeholder="例：RIDEX、料金、公式ガイド"/><div className="filters">{Object.entries({all:'すべて',...categories}).map(([key,label])=><button key={key} aria-pressed={key===cat} onClick={()=>setCat(key)}>{label}</button>)}</div><p role="status">{hits.length}件 {q&&`「${q}」の検索結果`}</p><div className="search-results">{hits.map(a=><a href={articleHref(a)} key={a.slug}><span className="tag">{categories[a.category]} / {statusLabels[a.status]}</span><h2>{a.title}</h2><p>{a.summary}</p><span className="text-link">記事へ →</span></a>)}</div>{!hits.length&&<div className="empty"><h2>該当する記事がありません</h2><p>名前の一部や別の言葉でも検索できます。</p><button onClick={()=>{setQ('');setCat('all')}}>条件をクリア</button></div>}</>}

