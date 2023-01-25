
import Link from "next/link";
import CustomHead from "../head/head";

import styles from './mainLayout.module.scss';

const routes = [
    {href: '/', text: 'Главная'},
    {href: '/doors', text: 'Двери'},
];

const MainContainer = ({ children, keywords, title }) => {
    return (
        <>
            <CustomHead keywords={keywords} title={title} />
            {routes.map(route => <Link className={styles.check} key={route.href} href={route.href}>{route.text}</Link>)}
            { children }
        </>
    );
};

export default MainContainer;