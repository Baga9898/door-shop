import Link from "next/link";

import styles from './catalogItem.module.scss';

const CatalogItem = ({ door }) => {
  return (
    <Link href={`/doors/${door._id}`} className={styles.doorCard} >
        <img src={`http://localhost:5000/${door.image}`} alt={door.name} />
        <p className={styles.doorName}>{door.name}</p>
        <p className={styles.doorPrice}>{door.price}</p>
    </Link>
  )
}

export default CatalogItem;
