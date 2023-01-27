import { BsTelegram, BsWhatsapp }   from 'react-icons/bs';
import { FaViber }                  from 'react-icons/fa';
import { SlSocialVkontakte }        from 'react-icons/sl';

import styles                       from './social.module.scss';

const Social = () => {
    return (
        <div className={styles.social}>
            <BsTelegram title='Telegram' />
            <BsWhatsapp title='Whatsapp' />
            <SlSocialVkontakte title='Vkontakte' />
            <FaViber title='Viber' />
        </div>
    );
};

export default Social;
