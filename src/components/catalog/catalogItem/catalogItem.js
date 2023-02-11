import { MdDelete } from 'react-icons/md';
import axios        from 'axios';
import Link         from "next/link";

import { useAppSelector } from "../../../redux/hook";

import styles from './catalogItem.module.scss';

const CatalogItem = ({ door }) => {
  const isAuth = useAppSelector(state => state.user.isAuth);

  const handleDelete = async(doorId) => {
    try {
      await axios.delete(`http://localhost:5000/api/doors/${doorId}`); 
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.cardWrapper}>
      {isAuth && <MdDelete onClick={() => handleDelete(door._id)} className={styles.deleteIcon}/>} 
      <Link href={`/doors/${door._id}`} className={styles.doorCard} >
        <img src={`http://localhost:5000/${door.image}`} alt={door.name} />
        <p className={styles.doorName}>{door.name}</p>
        <p className={styles.doorPrice}>{door.price}</p>
      </Link>
    </div>
  );
};

export default CatalogItem;
