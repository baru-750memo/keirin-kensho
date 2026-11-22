// ponytail: 記事と公開設定はファイル管理。複数編集者が必要になった時点でCMSを検討する。
export function validateSettings(env:Record<string,string|undefined>) {
  const live=env.SITE_PUBLISHED==='true';
  const url=env.SITE_URL ? new URL(env.SITE_URL) : null;
  if(url&&(url.protocol!=='https:'||url.username||url.password||url.pathname!=='/'||url.search||url.hash)) throw new Error('SITE_URLにはHTTPSの公開ドメインのみを指定してください');
  if(live&&(!url||url.hostname==='localhost'||url.hostname.endsWith('.invalid')||!env.SITE_OPERATOR||!env.SITE_CONTACT)) throw new Error('公開にはSITE_URL・SITE_OPERATOR・SITE_CONTACTの設定が必要です');
  return {live,url:url?.origin??'http://127.0.0.1:3110',operator:env.SITE_OPERATOR??'未設定',contact:env.SITE_CONTACT??'未設定'};
}
export const settings=validateSettings(process.env);
