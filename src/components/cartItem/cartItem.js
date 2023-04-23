// Refactoring need
import { useState } from 'react';

import styles from './styles.module.scss';

const CartItem = ({ door, cartDoors }) => {
    const [count, setCount] = useState(door.count || 1);
    const currentDoor = cartDoors.filter(cartDoor => cartDoor._id === door._id && cartDoor.chosenSize === door.chosenSize)[0];
    const basePath = process.env.NEXT_PUBLIC_API_LINK;

    // useEffect(() => {
    //     currentDoor.fullPrice = +door.price;
    // }, []);

    const decrement = () => {
        if (count > 1) {
            setCount(prevState => prevState - 1);
            // currentDoor.count = count - 1;
            // currentDoor.fullPrice = (+door.price * count) - +door.price;
        }
    };

    const inccrement = () => {
        setCount(prevState => prevState + 1);
        // currentDoor.count = count + 1;
        // currentDoor.fullPrice = (+door.price * count) + +door.price;
    };

    const deleteFromCart = (article, size) => {
        const itemForDelete = cartDoors.filter(door => door.article === article && door.chosenSize === size)[0];
        const indexOfChosenDoor = cartDoors.indexOf(itemForDelete);
        // cartDoors.splice(indexOfChosenDoor, 1);
    };

    return (
        <div className={styles.cartItem}>
            <div className={styles.leftSide}>
                <img src={`${basePath}/${door.image}`} alt={door.name} />
                <div className={styles.articlePart}>
                    <div className={styles.articleName}>
                        <p><span>Арт.</span> {door.article}</p>
                        <p>{door.name}</p>
                    </div>
                    <div>
                        {/* <button>В избранное</button> */}
                        {/* <span> | </span> */}
                        <button onClick={() => deleteFromCart(door.article, door.chosenSize)}>Удалить</button>
                    </div>
                </div>
            </div>
            <div className={styles.rightSide}>
                <div>
                    {door.chosenSize && (
                        <div className={styles.spec}>
                            <p>{door.chosenSize}</p>
                        </div>
                    )}
                    {door.direction && (
                        <div className={styles.spec}>
                            <p>{door.direction}</p>
                        </div>
                    )}
                </div>
                <div>
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
        </div>
    );
};

export default CartItem;
