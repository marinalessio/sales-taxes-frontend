import Head from 'next/head';
import Link from 'next/link';
import styles from './layout.module.scss';

export default function Layout({ children }) {
    return (
        <div className={styles.layoutContainer}>
            <header className={styles.header}>
                <ul>
                    <li><Link href="/products">Products</Link></li>
                    <li>
                        <Link href="/products/new">New product</Link>
                    </li>
                </ul>
            </header>
            <div>{children}</div>
        </div>
    )
}