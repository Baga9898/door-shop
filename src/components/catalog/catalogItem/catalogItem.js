// Refactoring need
import { MdDelete } from 'react-icons/md';
import { useState } from 'react';
import axios        from 'axios';
import Link         from 'next/link';

import { addCartDoor }    from '../../../redux/slices/cartSlice';
import { deleteDoorById } from '../../../redux/slices/catalogSlice';
import { directions }     from '../../../constants';
import { isInCart }       from '../../../utils';
import { notify }         from './../../shared/notify/notify';
import { useAppDispatch } from './../../../redux/hook';
import { useAppSelector } from "../../../redux/hook";
import Modal              from '../../shared/modal/modal';

import styles from './catalogItem.module.scss';

const CatalogItem = ({ door }) => {
  const dispatch = useAppDispatch();
  const [chosenSize, setChosenSize] = useState('');
  const [chosenDirection, setChosenDirection] = useState(directions[0]);
  const [choseModalIsOpen, setChoseModalIsOpen] = useState(false);
  const { isAuth, currentUser } = useAppSelector(state => state.user);
  const uniqueUserId = useAppSelector(state => state.app.uniqueUserId);
  const inCartDoors = useAppSelector(state => state.cart.cartDoors);
  const isAdmin = currentUser.roles?.includes('admin');
  const basePath = process.env.NEXT_PUBLIC_API_LINK;

  const handleDelete = async(doorId) => {
    dispatch(deleteDoorById(doorId));
  };

  // В санки.
  const setDoorsInCart = async(doorForCart) => {
    try {
      axios.put(`${basePath}/api/cart/${uniqueUserId}`, {cartDoors: [...inCartDoors, doorForCart]})
        .then(response => {
          dispatch(addCartDoor(response.data.cartDoors[0]));
        });
    } catch (error) {}
  };

  const addToCart = () => {
    if (chosenSize === '') {
      notify('warn', 'Необходимо выбрать размер');
      return;
    }
    
    const doorForCart = {
      ...door, 
      count: 1, 
      chosenSize: chosenSize,
      direction: chosenDirection,
    };

    setDoorsInCart(doorForCart);
    notify('success', 'Товар успешно добавлен в корзину');
    closeModal();
  };

  const openModal = () => {
    setChoseModalIsOpen(true);
  };

  const closeModal = () => {
    setChoseModalIsOpen(false);
  };

  const inCartNotify = () => {
    notify('info', 'Данное сочетание характеристик товара уже добавлено в корзину');
  };

  return (
    <>
      <div className={styles.cardWrapper}>
        {isAuth && isAdmin && <MdDelete onClick={() => handleDelete(door._id)} className={styles.deleteIcon}/>} 
        <div className={styles.doorCard}>
          <Link href={`/doors/${door._id}`}>
            <img src={`${basePath}/${door.image}`} alt={door.name} />
            <p className={styles.doorArticle}>Арт. {door.article}</p>
            <p className={styles.doorName}>{door.name}</p>
          </Link>
            <div className={styles.bottomSide}>
              <p className={styles.doorPrice}>{door.price}&#8381;</p>
              <button onClick={openModal}>В корзину</button>
            </div>
        </div>
      </div>
      <Modal
        title='Выберите характеристики'
        isOpen={choseModalIsOpen}
        onCloseFunction={closeModal}
        secondText={isInCart(inCartDoors, door.article, chosenSize, chosenDirection) ? 'В корзине' : 'В корзину'}
        secondAction={isInCart(inCartDoors, door.article, chosenSize, chosenDirection) ? inCartNotify : addToCart}
      >
        <div className={styles.specs}>
          <div>
            <p>Размер: </p>
          </div>
          <div className={styles.specWrapper}>
            {door.sizes && door.sizes.toString().split(',').map(size => (
              <li 
                key={size} 
                className={size === chosenSize && styles.active}
                onClick={() => setChosenSize(size)}
              >
                {size}
              </li>
            ))}
          </div>
        </div>
        {door.withLeftRight &&
          <div className={styles.specs}>
            <div>
              <p>Нправление:</p>
            </div>
            <div className={styles.specWrapper}>
              {directions && directions.map(direction => (
                <li 
                  key={direction}
                  className={direction === chosenDirection && styles.active}
                  onClick={() => setChosenDirection(direction)}
                >
                  {direction}
                </li>
              ))}
            </div>
          </div>
        }
      </Modal>
    </>
  );
};

export default CatalogItem;
