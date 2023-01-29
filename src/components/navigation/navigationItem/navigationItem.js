import { useRouter }   from "next/router";
import Link            from "next/link";

import styles          from './navigationItem.module.scss';

const NavigationItem = ({ route }) => {
    const router = useRouter();
    const isCurrentPath = router.asPath === route.href;

    return (
        <li className={isCurrentPath ? styles.linkActive : styles.link}>
            <Link  
                href={route.href}
            >
                {route.text}
            </Link>
        </li>
    );
};

export default NavigationItem;