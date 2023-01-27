import Image from 'next/image';
import HeaderActions   from '../headerActions/headerActions';
import Navigation      from '../navigation/navigation';

import styles          from './header.module.scss';

const Header = () => {
    return (
        <header className={styles.wrapper}>
            <Image
                src='/assets/logo-example.png'
                width={120}
                height={120}
            />
            <Navigation />
            <HeaderActions />
        </header>
    );
};

export default Header;
