import type {MetadataRoute} from 'next';
import {settings} from '@/lib/settings';
export const dynamic='force-static';
export default function robots():MetadataRoute.Robots{return settings.live?{rules:{userAgent:'*',allow:'/',disallow:'/search/'},sitemap:settings.url+'/sitemap.xml'}:{rules:{userAgent:'*',disallow:'/'}};}
