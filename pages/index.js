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
        Sales taxes problem
        <Link href="/products">
          <button>
            Enter
          </button>
          </Link>
      </main>
      
    </div>
  )
}
