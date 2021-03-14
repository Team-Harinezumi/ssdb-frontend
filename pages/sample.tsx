import { NextPage } from 'next'
import Link from 'next/link'

const SamplePage: NextPage = () => (
  <>
    <h1>Sample Page!!</h1>
    <div>これはサンプルページです</div>
    <Link href="/">
      Top
    </Link>
  </>
)

export default SamplePage
