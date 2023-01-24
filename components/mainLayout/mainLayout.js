import Head from "next/head";
import Link from "next/link";

import styles from './mainLayout.module.scss';

const routes = [
    {href: '/', text: 'Главная'},
    {href: '/doors', text: 'Двери'},
];

const MainContainer = ({ children, keywords }) => {
    return (
        <>
            <Head>
                <meta keywords={`двери, ${keywords}`}></meta>
                <title>Главная</title>
            </Head>
            {routes.map(route => <Link className={styles.check} key={route.href} href={route.href}>{route.text}</Link>)}
            { children }
        </>
    );
};

export default MainContainer;