import axios from 'axios'
import csvtojson from 'csvtojson'
import { isGssUrl, createGssCsvUrl, createGssPubHtmlUrl } from '../lib/gss_url'

// GSSのデータを取ってくる
export const fetchGss = async (url: string, gidParam?: string) => {
  try {
    if (isGssUrl(url)) {
      const adjustedUrl = createGssCsvUrl(url, gidParam)
      const res = await axios.get(adjustedUrl)
      return csvtojson({
        noheader: true,
        output: "csv"
      })
      .fromString(res.data)
    }
    return ''
  } catch(e) {
    return ''
  }
}

// シートの情報を取ってくる
export const fetchSheetsInfo = async (url: string) => {
  try {
    if (isGssUrl(url)) {
      const adjustedUrl = createGssPubHtmlUrl(url)
      const res = await axios.get(adjustedUrl)
      const domParser = new DOMParser()
      const dom = domParser.parseFromString(res.data, "text/html")
      const sheetMenu = Array.from(dom.getElementById('sheet-menu')?.getElementsByTagName('li') || [])
      const sheetInfo = sheetMenu.map(node => (
        {
          gid: node.id.split('-')[2],
          sheetName: node.innerText
        }
      ))
      return {
        title: dom.title.slice(0,-14),
        data: sheetInfo
      }
    }

  } catch(e) {
    return []
  }
}
