import { routes }       from "./routes";
import NavigationItem   from "./navigationItem/navigationItem";

import styles           from './navigation.module.scss';

const Navigation = () => {
    return (
        <nav className={styles.navigation}>
            <ul>
                {routes.map((route, index) => (
                    <NavigationItem key={`${route.href}_${index}`} route={route} />
                ))}
            </ul>
        </nav>
    );
};

export default Navigation;
