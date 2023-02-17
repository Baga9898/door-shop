import { useState } from 'react';

import styles from './styles.module.scss';

const CartItem = ({ door }) => {
    const [count, setCount] = useState(1);

    const decrement = () => {
        setCount(prevState => prevState - 1);
    };

    const inccrement = () => {
        setCount(prevState => prevState + 1);
    };

    return (
        <div className={styles.cartItem}>
            <div className={styles.leftSide}>
                <img src={`http://localhost:5000/${door.image}`} alt={door.name} />
                <div className={styles.articlePart}>
                    <div className={styles.articleName}>
                        <p><span>Арт.</span> {door.article}</p>
                        <p>{door.name}</p>
                    </div>
                    <div>
                        {/* <button>В избранное</button> */}
                        {/* <span> | </span> */}
                        <button>Удалить</button>
                    </div>
                </div>
            </div>
            <div className={styles.rightSide}>
                <div className={styles.sum}>
                    <p>{+door.price * count}<span> &#8381;</span></p>
                    <p>{door.price} &#8381;/шт.</p>
                </div>
                <div className={styles.counter}>  
                    <button onClick={decrement}>-</button>
                    <p>{count}</p>
                    <button onClick={inccrement}>+</button>
                </div>
            </div>
        </div>
    );
};

export default CartItem;
