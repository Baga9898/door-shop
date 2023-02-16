import { MdDelete } from 'react-icons/md';
import { useState } from 'react';
import Link         from "next/link";

import { deleteDoorById } from '../../../redux/slices/catalogSlice';
import { useAppDispatch } from './../../../redux/hook';
import { useAppSelector } from "../../../redux/hook";

import styles from './catalogItem.module.scss';
import { notify } from './../../shared/notify/notify';

const CatalogItem = ({ door }) => {
  const [inCart, setInCart] = useState([]);
  const isAuth = useAppSelector(state => state.user.isAuth);
  const dispatch = useAppDispatch();

  const handleDelete = async(doorId) => {
    dispatch(deleteDoorById(doorId));
  };

  const handleClick = () => {
    let cartDoors = JSON.parse(localStorage.getItem('cartDoors')) || [];
    cartDoors.push(door);
    localStorage.setItem('cartDoors', JSON.stringify(cartDoors));
    setInCart(cartDoors);
    notify('success', 'Товар успешно добавлен в корзину');
  };

  const isInCart = (doorId) => {
    inCart.map(door => door._id).includes(doorId);
  };

  return (
    <div className={styles.cardWrapper}>
      {isAuth && <MdDelete onClick={() => handleDelete(door._id)} className={styles.deleteIcon}/>} 
      <div className={styles.doorCard}>
        <Link href={`/doors/${door._id}`}>
          <img src={`http://localhost:5000/${door.image}`} alt={door.name} />
        </Link>
          <div className={styles.bottomSide}>
            <div>
              <p className={styles.doorName}>{door.name}</p>
              <p className={styles.doorPrice}>{door.price}&#8381;</p>
            </div>
            {isInCart(door._id) ?
              <button>В корзине</button> :
              <button onClick={handleClick}>В корзину</button>
            }
          </div>
      </div>
    </div>
  );
};

export default CatalogItem;
