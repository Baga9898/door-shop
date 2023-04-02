import Link from 'next/link';

import Button from '../shared/button/button';

import styles from './styles.module.scss';

const PageDownSide = () => {
    return (
        <div className={styles.pageDownSide}>
            <Link href={'/doors'}>
                <Button text='Смотреть все' />
            </Link>
        </div>
    );
};

export default PageDownSide;
