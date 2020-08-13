import Head from 'next/head';
import Link from 'next/link';
import styles from './layout.module.scss';

export default function Layout({ children }) {
    return (
        <div>
            <Head>
                <title>Sales taxes problem</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <div>COMMON</div>
            <div className={styles.container}>{children}</div>
        </div>
    )
}