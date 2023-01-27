import Logo from '../../logo/logo';

import styles from './leftside.module.scss';

const Leftside = () => {
    const currentYear = new Date().getFullYear();

    return (
        <div className={styles.leftside}>
            <Logo />
            <p>&copy; Тут имя компании или ип {currentYear}</p>
        </div>
    );
};

export default Leftside;
