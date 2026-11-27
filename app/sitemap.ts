import type {MetadataRoute} from 'next';
import {settings} from '@/lib/settings';
import {articles,articleHref} from '@/lib/content';
export const dynamic='force-static';
// ponytail: 確認済み記事だけを掲載。制作・プレビュー環境ではサイトマップを空にする。
export default function sitemap():MetadataRoute.Sitemap{return settings.live?['/','/check/','/news/','/column/','/sites/','/about/','/guide/','/media/',...articles.filter(a=>a.status==='reviewed').map(articleHref)].map(path=>({url:settings.url+path})):[];}
