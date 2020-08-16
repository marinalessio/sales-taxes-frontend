import Head from 'next/head';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="container">

      <Head>
        <title>Sales taxes problem</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>Sales taxes problem</h1>
        <Link href="/products">
          <button>
            View
          </button>
          </Link>
      </main>
      
    </div>
  )
}
