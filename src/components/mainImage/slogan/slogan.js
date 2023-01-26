import * as INTL   from '../../../texts';

import styles      from './slogan.module.scss';

const Slogan = () => {
  return (
    <div className={styles.mainSlogan}>
        <h1>{INTL.slogan}</h1>
        <p>{INTL.subSlogan}</p>
    </div>
  )
}

export default Slogan;
