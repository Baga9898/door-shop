// Refactoring need
import { useDispatch } from 'react-redux';
import { useState }    from 'react';
import axios           from 'axios';

import { useAppSelector } from '../../redux/hook';

import styles from './styles.module.scss';
import { setCartDoors } from '../../redux/slices/cartSlice';

const CartItem = ({ door, cartDoors }) => {
    const dispatch = useDispatch();
    const [count, setCount] = useState(door.count || 1);
    const uniqueId = useAppSelector(state => state.app.uniqueUserId);
    const currentDoor = cartDoors.filter(cartDoor => cartDoor._id === door._id 
        && cartDoor.chosenSize === door.chosenSize
        && (cartDoor.direction && cartDoor.direction === door.direction)
    )[0];
    const basePath = process.env.NEXT_PUBLIC_API_LINK;

    // Вынести в санку.
    const updateCartDoor = () => {
        try {
            axios.put(`${basePath}/api/cart/edit/${uniqueId}`, {
                currentDoorId: currentDoor._id,
                chosenSize: currentDoor.chosenSize,
                direction: currentDoor.direction,
                fullPrice: +door.price * (count + 1),
                count: count + 1,
            })
        } catch (error) {}
    }

    const decrement = () => {
        if (count > 1) {
            setCount(prevState => prevState - 1);
            updateCartDoor();
        }
    };

    const inccrement = () => {
        setCount(prevState => prevState + 1);
        updateCartDoor();
    };

    const deleteFromCart = (id, size, direction) => {
        try {
            axios.put(`${basePath}/api/cart/delete/${uniqueId}`, {
                currentDoorId: id,
                chosenSize: size,
                direction: direction,
            }).then((response) => {
                dispatch(setCartDoors(response.data.cartDoors));
            });
        } catch (error) {}
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
                        <button onClick={() => deleteFromCart(door._id, door.chosenSize, door.direction)}>Удалить</button>
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
