import HeaderActions   from '../headerActions/headerActions';
import Logo            from '../logo/logo';
import Navigation      from '../navigation/navigation';

import styles          from './header.module.scss';

const Header = () => {
    return (
        <header className={styles.wrapper}>
            <Logo />
            <span className={styles.fullWidthNavigation}><Navigation /></span>
            <HeaderActions />
        </header>
    );
};

export default Header;
