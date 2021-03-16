import axios from 'axios'
import { isGssUrl, createGssCsvUrl } from '../lib/gss_url'

// csv形式でGSSのデータを取ってくる
export const fetchGss = async (url: string) => {
  try {
    if (isGssUrl(url)) {
      const adjustedUrl = createGssCsvUrl(url)
      const res = await axios.get(adjustedUrl)
      return res.data
    }
    return ''
  } catch(e) {
    return ''
  }
}
