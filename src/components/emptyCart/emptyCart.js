import Link from 'next/link';

import styles from './styles.module.scss';

const EmptyCart = () => {
    return (
        <div className={styles.emptyCart}>
            <p>Упс, ваша корзина пока что пуста!</p>
            <p>Самое время для покупок</p>
            <Link href={'/doors'}>
                <button>Каталог</button>
            </Link>
        </div>
    );
};

export default EmptyCart;
