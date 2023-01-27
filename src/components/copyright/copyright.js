import styles from './copyright.module.scss';

const Copyright = () => {
    const currentYear = new Date().getFullYear(); 

    return (
        <div className={styles.copyright}>&#169; Имя компании {currentYear}</div>
    );
};

export default Copyright;
