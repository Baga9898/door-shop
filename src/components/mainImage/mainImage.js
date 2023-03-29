import { useState, useEffect } from 'react';
import Image         from "next/image";
import Link          from "next/link";

import { doorsRoute } from '../../constants';
import * as INTL      from '../../texts';
import Slogan         from './slogan/slogan';

import styles from './mainImage.module.scss';

const MainImage = () => {
    const [imageSize, setImageSize] = useState({
        width: 1200,
        height: 600,
    });

    // Вынести в утилиты.
    const getImagesize = (windowCurrentWidth) => {
        if (windowCurrentWidth <= 600) {
            setImageSize({ width: 360, height: 200 });
        } else if (windowCurrentWidth <= 800) {
            setImageSize({ width: 560, height: 320 });
        } else if (windowCurrentWidth <= 1000) {
            setImageSize({ width: 760, height: 460 });
        } else if (windowCurrentWidth <= 1250) {
            setImageSize({ width: 960, height: 520 });
        }
    };

    useEffect(() => {
        const windowInnerWidth = document.documentElement.clientWidth;
        getImagesize(windowInnerWidth);
    }, []);

    return (
        <div className={styles.mainImage}>
            <Slogan />
            <Image
                src='/assets/main-screen-door.jpg'
                alt='door main image'
                priority={1}
                width={imageSize.width}
                height={imageSize.height}
            />
            <Link href={doorsRoute}>
                <button>{INTL.catalogButton}</button>
            </Link>
        </div>
    )
}

export default MainImage;