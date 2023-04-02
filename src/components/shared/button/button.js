import styles from './styles.module.scss';

const Button = ({ text }) => {
    return (
        <button className={styles.transitionButton}>{text}</button>
    );
};

export default Button;