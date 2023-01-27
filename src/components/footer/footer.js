import Contacts   from '../contacts/contacts';
import Copyright from '../copyright/copyright';
import Social     from '../social/social';

import styles     from './footer.module.scss';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <Contacts />
      <Social />
      <Copyright />
    </footer>
  )
}

export default Footer;