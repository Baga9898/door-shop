import Image            from "next/image";
import Link             from "next/link";

import { doorsRoute }   from '../../constants';
import * as INTL        from '../../texts';
import Slogan           from './slogan/slogan';

import styles           from './mainImage.module.scss';

const MainImage = () => {
    return (
        <div className={styles.mainImage}>
            <Slogan />
            <Image
                src='/assets/main-screen-door.jpg'
                alt='door main image'
                width={1200}
                height={600}
            />
            <Link href={doorsRoute}>
                <button>{INTL.catalog}</button>
            </Link>
        </div>
    )
}

export default MainImage;