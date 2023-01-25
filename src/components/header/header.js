import HeaderActions   from '../headerActions/headerActions';
import Navigation      from '../navigation/navigation';

import styles          from './header.module.scss';

const Header = () => {
    return (
        <header className={styles.wrapper}>
            <div>Logo here</div>
            <Navigation />
            <HeaderActions />
        </header>
    );
};

export default Header;
