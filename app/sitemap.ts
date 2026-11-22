import type {MetadataRoute} from 'next';
import {settings} from '@/lib/settings';
import {articles,articleHref} from '@/lib/content';
export const dynamic='force-static';
// ponytail: 公開先と公開記事が未確定の制作版。架空のcanonicalや下書きURLを出力しない。
export default function sitemap():MetadataRoute.Sitemap{return settings.live?['/','/check/','/news/','/column/','/sites/','/about/','/guide/','/media/',...articles.filter(a=>a.status==='reviewed').map(articleHref)].map(path=>({url:settings.url+path})):[];}
