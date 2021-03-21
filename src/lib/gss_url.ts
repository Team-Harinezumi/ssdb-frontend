const GSS_ORIGIN = 'https://docs.google.com'
const SPREADSHEETS = 'spreadsheets'

export const isGssUrl = (url: string): boolean => {
  try {
    const urlObj = new URL(url)
  
    // オリジンの確認
    if (urlObj.origin !== GSS_ORIGIN) {
      return false
    }
  
    // pathnameの先頭がspreadsheetsか確認
    if (urlObj.pathname.slice(1, 13) !== SPREADSHEETS) {
      return false
    }
  
    return true
  } catch(e) {
    return false
  }
}

export const createGssCsvUrl = (url: string, gidParam?: string): string => {
  try {
    const urlObj = new URL(url)
  
    // 公開URLでない場合は '' を返す
    if (urlObj.pathname.slice(13, 18) !== '/d/e/') {
      return ''
    }
  
    // TODO: ドキュメント全体のURLが渡された場合は、何枚目のシートを使うか入力させるモーダル等が必要。一旦1枚目にしてます。
    const uniqueId = (urlObj.pathname.split('/'))[4]
    const gid = urlObj.searchParams.get('gid') || gidParam || '0'
    return `https://docs.google.com/spreadsheets/d/e/${uniqueId}/pub?gid=${gid}&single=true&output=csv`
  } catch(e) {
    return ''
  }
}

export const createGssPubHtmlUrl = (url: string): string => {
  try {
    const urlObj = new URL(url)
  
    // 公開URLでない場合は '' を返す
    if (urlObj.pathname.slice(13, 18) !== '/d/e/') {
      return ''
    }

    const uniqueId = (urlObj.pathname.split('/'))[4]
    return `https://docs.google.com/spreadsheets/d/e/${uniqueId}/pubhtml`
  } catch(e) {
    return ''
  }
}
