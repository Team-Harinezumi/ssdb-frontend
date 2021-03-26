import { useEffect, useState } from "react"

// How to Use
// fileName: string
// data: string[][]
//
// 例
// const data = [
//   ["Name", "Debut date", "Birthday", "Height", "Fanbase name", "Illustrator", "Twitter"],
//   ["Mori Calliope", "September 12, 2020", "April 4th", "167 cm", "", "Yukisame", "https://twitter.com/moricalliope"],
//   ["Takanashi Kiara", "September 12, 2020", "July 6th", "165 cm", "", "huke", "https://twitter.com/takanashikiara"]
// ];
//
// <DownloadButton fileName={fileName} data={data} />

interface DownloadData {
  fileName: string
  data: string[][]
}
  
export const DownloadButton: React.FC<DownloadData> = ({ fileName, data }: DownloadData) => {
  const [downloadInfo, setDownloadInfo] = useState<string[]>([])

  useEffect(() => {
    const recordsForCSV = data.map(record => {
      return record.map(cell => {
        if (cell.includes(",")) {
          return `"${cell}"`
        } else {
          return cell
        }
      })
    })

    let downloadData = recordsForCSV.map(record => record.join(',')).join('\r\n')
    let bom = new Uint8Array([0xEF, 0xBB, 0xBF])
    let blob = new Blob([bom, downloadData], {type: 'text/csv'});
    let url = (window.URL || window.webkitURL).createObjectURL(blob);

    setDownloadInfo([`${fileName}.csv`, url])
  }, [])

  return (
    <>
      {
        downloadInfo[0]
        &&
        <a download={downloadInfo[0]} className='download_btn' href={downloadInfo[1]}>ダウンロード</a>
      }
    </>
  )
}
