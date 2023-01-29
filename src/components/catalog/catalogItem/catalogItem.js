import Link from "next/link";

import styles from './catalogItem.module.scss';

const CatalogItem = ({ door }) => {
  return (
    <Link href={`/doors/${door.id}`} className={styles.doorCard} >
        <img src='/assets/door-example.png' alt={door.name} />
        <p className={styles.doorName}>{door.name}</p>
        <p className={styles.doorPrice}>{door.price}</p>
    </Link>
  )
}

export default CatalogItem;
