import Link from "next/link";

import { routes } from "./routes";

import styles from './navigation.module.scss';

const Navigation = () => {
  return (
    <nav className={styles.navigation}>
        <ul>
            {routes.map((route) => (
                <li>
                    <Link  
                        key={route.href} 
                        href={route.href}
                    >
                        {route.text}
                    </Link>
                </li>
            ))}
        </ul>
    </nav>
  );
};

export default Navigation;
