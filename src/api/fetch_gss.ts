import axios from 'axios'
import csvtojson from 'csvtojson'
import { isGssUrl, createGssCsvUrl } from '../lib/gss_url'

// GSSのデータを取ってくる
export const fetchGss = async (url: string) => {
  try {
    if (isGssUrl(url)) {
      const adjustedUrl = createGssCsvUrl(url)
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
