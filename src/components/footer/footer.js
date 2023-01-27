import Leftside    from './leftside/leftside';
import Rightside   from './rightside/rightside';

import styles      from './footer.module.scss';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <Leftside />
      <Rightside />
    </footer>
  )
}

export default Footer;