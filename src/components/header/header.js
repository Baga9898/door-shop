import Navigation from "../navigation/navigation";

import styles from './header.module.scss';

const Header = () => {
    return (
        <header className={styles}>
            <div>Logo here</div>
            <Navigation />
            <div>action icons</div>
        </header>
    );
};

export default Header;
